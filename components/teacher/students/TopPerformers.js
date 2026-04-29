"use client";

import { useEffect, useState } from "react";
import styles from "./TopPerformers.module.css";

export default function TopPerformers({ courseOfferingId }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!courseOfferingId) {
      setStudents([]);
      return;
    }

    const fetchTopStudents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/course-offerings/${courseOfferingId}/top-students`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch top performers:", err);
      }
    };

    fetchTopStudents();
  }, [courseOfferingId]);

  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        <h2>Top Performers</h2>
        <span>Top GPA</span>
      </div>

      {!courseOfferingId && <p>Select course first.</p>}

      {courseOfferingId && students.length === 0 && (
        <p>No top performers found.</p>
      )}

      {students.map((student) => (
        <div className={styles.performer} key={student.studentId}>
          <h3>{student.fullName}</h3>
          <p>
            GPA: {Number(student.gpa).toFixed(2)} • {student.studentCode}
          </p>
        </div>
      ))}

      <div className={styles.insight}>
        <div className={styles.insightTitle}>
          <span className="material-symbols-outlined">trending_up</span>
          <h3>Class Insight</h3>
        </div>

        <p>
          Select a course to view top GPA performers for that course offering.
        </p>
      </div>
    </aside>
  );
}
