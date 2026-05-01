"use client";

import { useEffect, useState } from "react";
import styles from "./CoursesMain.module.css";
import CourseGrid from "./CourseGrid";
import CourseDetail from "./CourseDetail";

export default function CoursesMain() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/enrollments?userId=${user?.userId}&termId=${status.termId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
      }
    };

    fetchCourses();
  }, [status?.termId, user?.userId]);

  console.log(courses)

  return (
    <div className={styles.wrapper}>
      {!selectedCourse ? (
        <CourseGrid courses={courses} onSelect={setSelectedCourse} />
      ) : (
        <CourseDetail
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}
