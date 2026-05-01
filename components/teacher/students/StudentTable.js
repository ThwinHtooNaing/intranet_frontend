"use client";

import { useEffect, useState } from "react";
import styles from "./StudentTable.module.css";

export default function StudentTable() {
  const [studentsPage, setStudentsPage] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.userId;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/${33}/students?page=${page}&size=5`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setStudentsPage(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };

    fetchStudents();
  }, [page]);

  const students = studentsPage?.content || [];

  const start = studentsPage?.totalElements
    ? studentsPage.number * studentsPage.size + 1
    : 0;

  const end = studentsPage
    ? Math.min(
        (studentsPage.number + 1) * studentsPage.size,
        studentsPage.totalElements,
      )
    : 0;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Enrollment Registry</h2>
      </div>

      <div className={styles.table}>
        <div className={styles.head}>
          <span>STUDENT NAME</span>
          <span>STUDENT ID</span>
          <span>MAJOR</span>
          <span>COURSE</span>
          <span>STATUS</span>
        </div>

        {students.map((student) => (
          <div className={styles.row} key={student.enrollmentId}>
            <h3>{student.fullName}</h3>
            <p>{student.studentCode}</p>
            <p>{student.majorName || "-"}</p>
            <p>{student.courseTitle}</p>
            <p>{student.enrollmentStatus}</p>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>
          Showing {start}-{end} of {studentsPage?.totalElements ?? 0} students
        </p>

        <div className={styles.pagination}>
          <button
            disabled={studentsPage?.first}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </button>

          {Array.from({ length: studentsPage?.totalPages || 0 }).map(
            (_, index) => (
              <button
                key={index}
                className={page === index ? styles.active : ""}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            ),
          )}

          <button
            disabled={studentsPage?.last}
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
