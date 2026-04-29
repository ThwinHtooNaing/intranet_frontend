"use client";

import { useEffect, useState } from "react";
import styles from "./QuickFilters.module.css";

export default function QuickFilters() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.userId;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/schedules/${userId}/quick-stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <section className={styles.card}>
      <h3>Quick Filters</h3>

      <div className={styles.filter}>
        <span className="material-symbols-outlined">school</span>
        <p>My Lectures</p>
        <b>{stats?.lectures ?? 0}</b>
      </div>

      <div className={styles.filter}>
        <span className="material-symbols-outlined">groups</span>
        <p>Faculty Meetings</p>
        <b>{stats?.meetings ?? 0}</b>
      </div>

      <div className={styles.filter}>
        <span className="material-symbols-outlined">calendar_month</span>
        <p>Office Hours</p>
        <b>{stats?.officeHours ?? 0}</b>
      </div>

      <button>View Full Calendar</button>
    </section>
  );
}
