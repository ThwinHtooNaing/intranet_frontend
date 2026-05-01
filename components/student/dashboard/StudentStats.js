"use client";

import { useEffect, useState } from "react";
import styles from "./StudentStats.module.css";

function getWeeksBetween(start, end) {
  const diff = end - start;
  return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
}

export default function StudentStats() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      setUser(JSON.parse(item));
    }
  }, []);

  // registration status
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
        console.error("Failed to fetch status:", err);
      }
    };

    fetchStatus();
  }, []);

  // dashboard summary (GPA, credits, etc.)
  useEffect(() => {
    if (!status?.termId || !user?.userId) return;

    const fetchSummary = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/dashboard-cards?userId=${user?.userId}&termId=${status.termId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setSummary(data);
        console.log(summary);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };

    fetchSummary();
  }, [status?.termId, user?.userId]);

  // enrolled courses
  useEffect(() => {
    if (!status?.termId || !user?.userId) return;
    // make this dynamic

    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/enrollments?userId=${user?.userId}&termId=${status?.termId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [status?.termId, user?.userId]);

  const totalCourses = courses.length;
  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  const now = new Date();

  const start = status?.registrationOpen
    ? new Date(status.registrationOpen + "Z")
    : null;

  const end = status?.registrationClose
    ? new Date(status.registrationClose + "Z")
    : null;

  let progress = 0;
  let weeksDone = 0;
  let totalWeeks = 0;
  let statusLabel = "Not started";

  const MS_WEEK = 1000 * 60 * 60 * 24 * 7;

  if (start && end && start < end) {
    totalWeeks = Math.ceil((end - start) / MS_WEEK);

    if (now < start) {
      statusLabel = "Not started";
    } else if (now > end) {
      statusLabel = "Completed";
      progress = 100;
      weeksDone = totalWeeks;
    } else {
      statusLabel = "Ongoing";

      const elapsed = now - start;

      progress = Math.round((elapsed / (end - start)) * 100);
      weeksDone = (elapsed / MS_WEEK).toFixed(1);
    }
  }

  const remainingWeeks = Math.max(totalWeeks - weeksDone, 0);


  return (
    <div className={styles.statsGrid}>
      {/* GPA */}
      <div className={styles.statCard}>
        <span>GPA</span>
        <h2>{summary?.cumulativeGpa ?? "N/A"}</h2>
        <p className={styles.green}>
          {summary?.majorName ?? "Academic Program"}
        </p>
      </div>

      {/* Courses */}
      <div className={styles.statCard}>
        <span>Total Courses Enrolled</span>
        <h2>{totalCourses}</h2>
        <p>▣ {totalCredits} Credits</p>
      </div>

      {/* Term Progress */}
      <div className={styles.progressCard}>
        <span>Registration Progress</span>
        <h2>{progress}% Completed</h2>

        <div className={styles.progressBar}>
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <div className={styles.progressInfo}>
          <p>
            {weeksDone}/{totalWeeks} weeks completed
          </p>
          <p>{remainingWeeks} Weeks Remaining</p>
        </div>
      </div>
    </div>
  );
}
