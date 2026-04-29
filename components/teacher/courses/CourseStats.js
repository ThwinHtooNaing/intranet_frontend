"use client";

import { useEffect, useState } from "react";
import styles from "./CourseStats.module.css";

export default function CourseStats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.userId;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/${userId}/course-stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();

        setStats([
          {
            label: "TOTAL STUDENTS",
            value: data.totalStudents ?? 0,
          },
          {
            label: "TOTAL COURSES",
            value: data.totalCourses ?? 0,
          },
          {
            label: "ACTIVE COURSES",
            value: data.activeCourses ?? 0,
            badge: "Current",
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch course stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.stats}>
      {stats.map((item) => (
        <div className={styles.card} key={item.label}>
          <p>{item.label}</p>

          <div className={styles.row}>
            <h2>{item.value}</h2>
            {item.badge && <span>{item.badge}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
