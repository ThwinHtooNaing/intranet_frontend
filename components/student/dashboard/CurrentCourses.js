"use client"
import { useEffect, useState } from "react";
import styles from "./CurrentCourses.module.css";

export default function CurrentCourses({ onSelect }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      setUser(JSON.parse(item));
    }
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/registration-status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("Failed to fetch registration status:", err);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    if (!status?.termId || !user?.userId) return;

    const fetchCourses = async () => {
      try {
        // make those dynamic
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/enrollments?userId=${user?.userId}&termId=${status?.termId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch current courses");
        }

        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch current courses:", err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [status?.termId, user?.userId]);

  return (
    <section className={styles.section}>
      <div className={styles.courseGrid}>
        {courses.length === 0 ? (
          <p className={styles.empty}>No current courses found.</p>
        ) : (
          courses.map((course) => (
            <div className={styles.courseCard} key={course.enrollmentId}>
              <h3>{course.title}</h3>
              <p>{course.teacherName || "No teacher assigned"}</p>

              <span className={styles.label}>Section {course.sectionCode}</span>

              <button
                className={styles.viewBtn}
                onClick={() => onSelect?.(course)}
              >
                View Course <span>→</span>
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
