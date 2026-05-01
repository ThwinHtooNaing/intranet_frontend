"use client";

import { useEffect, useState } from "react";
import styles from "./GradesMain.module.css";
import GradeStats from "./GradeStats";
import GradeTable from "./GradeTable";
import GPAChart from "./GPAChart";
import AdvisingCard from "./AdvisingCard";

export default function GradesMain() {
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);

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
    // if (!status?.termId || !user?.id) return;

    const fetchSummary = async () => {
      try {
        //Make this dynamic
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/dashboard-cards?userId=1&termId=10`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch grade summary:", err);
      }
    };

    fetchSummary();
  }, [status?.termId, user?.id]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Academic Performance</h1>
        <p>
          {status
            ? `${status.termType} Semester ${status.academicYear} • Year ${
                summary?.currentYear ?? "-"
              }`
            : "Loading academic performance..."}
        </p>
      </div>

      <GradeStats summary={summary} />

      <GradeTable />

      <div className={styles.bottomGrid}>
        <GPAChart />
        <AdvisingCard />
      </div>
    </div>
  );
}
