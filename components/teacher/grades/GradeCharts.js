"use client";

import { useEffect, useState } from "react";
import styles from "./GradeCharts.module.css";

export default function GradeCharts({ courseOfferingId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!courseOfferingId) {
      setData(null);
      return;
    }

    const fetchCharts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/grades/course-offerings/${courseOfferingId}/charts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch grade charts:", err);
      }
    };

    fetchCharts();
  }, [courseOfferingId]);

  if (!courseOfferingId) {
    return <p>Select course first.</p>;
  }

  return (
    <div className={styles.grid}>
      <section className={styles.distribution}>
        <div className={styles.chartHeader}>
          <h2>Grade Distribution</h2>
          <span>Current Course</span>
        </div>

        <div className={styles.fakeChart}>
          {(data?.distribution || []).map((item) => (
            <div key={item.symbol}>
              <span>{item.symbol}</span>
              <b>{item.count}</b>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.progress}>
        <h2>Grade Progress</h2>

        <div
          className={styles.circle}
          style={{ "--percent": data?.gradedPercent ?? 0 }}
        >
          <div className={styles.inner}>
            <h3>{data?.gradedPercent ?? 0}%</h3>
            <p>GRADED</p>
          </div>
        </div>

        <h4>{data?.remaining ?? 0} Submissions Remaining</h4>
        <p>Total students: {data?.totalStudents ?? 0}</p>
      </section>
    </div>
  );
}
