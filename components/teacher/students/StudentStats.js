"use client";

import { useEffect, useState } from "react";
import styles from "./StudentStats.module.css";

export default function StudentStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.userId;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/${userId}/student-stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch student stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <div className={styles.iconBox}>
          <span className="material-symbols-outlined">groups</span>
        </div>

        <span className={styles.badge}>Total</span>

        <p>TOTAL STUDENTS</p>
        <h2>{stats?.totalStudents ?? 0}</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.iconBoxBlue}>
          <span className="material-symbols-outlined">person</span>
        </div>

        <span className={styles.badgeBlue}>Active</span>

        <p>ACTIVE NOW</p>
        <h2>{stats?.activeStudents ?? 0}</h2>
      </div>
    </div>
  );
}
