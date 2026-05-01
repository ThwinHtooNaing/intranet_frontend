"use client";

import { useEffect, useState } from "react";
import styles from "./QuickTranscripts.module.css";

function groupByTerm(grades = []) {
  return grades.reduce((acc, item) => {
    if (!acc[item.term]) acc[item.term] = [];
    acc[item.term].push(item);
    return acc;
  }, {});
}

function getGradeClass(grade, styles) {
  if (!grade || grade === "-") return "";

  if (grade.startsWith("A")) return styles.gradeA;
  if (grade.startsWith("B")) return styles.gradeB;
  if (grade.startsWith("C")) return styles.gradeC;
  return styles.gradeLow;
}

export default function QuickTranscripts() {
  const [user, setUser] = useState(null);
  const [grades, setGrades] = useState([]);
  const [activeTerm, setActiveTerm] = useState("");

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const data = JSON.parse(item);
      setUser(data);
    }
  }, []);

  useEffect(() => {
    
    if (!user?.userId) return;

    console.log(user?.userId);

    const fetchGrades = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/grades?userId=${user?.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        console.log(res)

        const data = await res.json();
        setGrades(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch transcripts:", err);
      }
    };

    fetchGrades();
  }, [user?.userId]);

  console.log(user?.userId);

  const grouped = groupByTerm(grades);
  const terms = Object.keys(grouped).sort().reverse();

  useEffect(() => {
    if (terms.length > 0 && !activeTerm) {
      setActiveTerm(terms[0]);
    }
  }, [terms, activeTerm]);

  const currentData = grouped[activeTerm] || [];

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Quick Transcripts</h2>

        <div className={styles.tabs}>
          {terms.map((term) => (
            <span
              key={term}
              className={activeTerm === term ? styles.active : ""}
              onClick={() => setActiveTerm(term)}
            >
              {term}
            </span>
          ))}
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Status</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="5" className={styles.empty}>
                No transcript data.
              </td>
            </tr>
          ) : (
            currentData.map((row) => (
              <tr key={row.enrollmentId}>
                <td>{row.courseCode}</td>
                <td>{row.courseTitle}</td>
                <td>{row.credits || "-"}</td>

                <td>
                  <span className={styles.status}>
                    {row.grade === "-" ? "In Progress" : "Completed"}
                  </span>
                </td>

                <td
                  
                >
                  <span className={`${styles.grade} ${getGradeClass(
                    row.grade,
                    styles,
                  )}`}>{row.grade}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
