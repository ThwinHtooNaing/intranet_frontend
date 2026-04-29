"use client";

import { useEffect, useState } from "react";
import styles from "./GradeStats.module.css";

export default function GradeStats({ courseOfferingId }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!courseOfferingId) return;

    const fetchStats = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/grades/course-offerings/${courseOfferingId}/stats`,
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
  }, [courseOfferingId]);

  if (!courseOfferingId) return null;

  const items = [
    {
      label: "TOTAL STUDENTS",
      value: stats?.totalStudents ?? 0,
      sub: "Enrolled",
      icon: "groups",
    },
    {
      label: "CLASS AVERAGE",
      value: `${(stats?.classAverage ?? 0).toFixed(1)}`,
      sub: "Final Grades",
      icon: "analytics",
    },
    {
      label: "PENDING GRADING",
      value: stats?.pendingGrading ?? 0,
      sub: "Not graded yet",
      icon: "schedule",
      danger: true,
    },
    {
      label: "COMPLETION RATE",
      value: `${stats?.completionRate ?? 0}%`,
      sub: "Graded students",
      icon: "check_circle",
    },
  ];

  return (
    <div className={styles.stats}>
      {items.map((item) => (
        <div className={styles.card} key={item.label}>
          <div>
            <p>{item.label}</p>
            <h2 className={item.danger ? styles.danger : ""}>{item.value}</h2>
            <span>{item.sub}</span>
          </div>

          <span className={`material-symbols-outlined ${styles.icon}`}>
            {item.icon}
          </span>
        </div>
      ))}
    </div>
  );
}
