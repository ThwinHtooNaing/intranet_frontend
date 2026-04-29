"use client";

import { useEffect, useState } from "react";
import styles from "./GradeTable.module.css";

export default function GradeTable({ courseOfferingId, onOpenModal }) {
  const [gradesPage, setGradesPage] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log(courseOfferingId)
    if (!courseOfferingId) {
      setGradesPage(null);
      return;
    }

    const fetchGrades = async () => {
      try {
        const id =  3;
        // make it dynamic
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/course-offerings/${id}/students?page=${page}&size=4`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setGradesPage(data);
      } catch (err) {
        console.error("Failed to fetch grades:", err);
      }
    };

    fetchGrades();
  }, [courseOfferingId, page]);

  const students = gradesPage?.content || [];

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>Student Performance</h2>
          <span>ACTIVE</span>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.head}>
          <span>STUDENT / ENROLLMENT NAME</span>
          <span>STUDENT ID</span>
          <span>COURSE</span>
          <span>MAJOR</span>
          <span>GRADE SYMBOL</span>
          <span>TIME</span>
          <span>ACTIONS</span>
        </div>

        {!courseOfferingId && (
          <p style={{ padding: "20px" }}>Select course first.</p>
        )}

        {students.map((student) => (
          <div className={styles.row} key={student.enrollmentId}>
            <p>{student.fullName}</p>
            <p>{student.studentCode}</p>
            <p>{student.courseCode}</p>
            <p>{student.majorName || "-"}</p>

            <span
              className={`${styles.grade} ${
                !student.gradeSymbol ? styles.orange : ""
              }`}
            >
              {student.gradeSymbol || "--"}
            </span>

            <div>
              <small className={!student.gradeSymbol ? styles.pending : ""}>
                {student.gradedAt
                  ? `Graded: ${student.gradedAt}`
                  : "Pending Submission"}
              </small>
            </div>

            <button
              type="button"
              onClick={() => onOpenModal(student)}
              className={!student.gradeSymbol ? styles.primaryBtn : ""}
            >
              Assign / Update Grade
            </button>
          </div>
        ))}
      </div>

      {gradesPage && (
        <div className={styles.footer}>
          <p>
            Showing {gradesPage.number * gradesPage.size + 1}-
            {Math.min(
              (gradesPage.number + 1) * gradesPage.size,
              gradesPage.totalElements,
            )}{" "}
            of {gradesPage.totalElements} students
          </p>

          <div className={styles.pagination}>
            <button
              type="button"
              disabled={gradesPage.first}
              onClick={() => setPage(page - 1)}
            >
              ‹
            </button>

            {Array.from({ length: gradesPage.totalPages || 0 }).map(
              (_, index) => (
                <button
                  type="button"
                  key={index}
                  className={page === index ? styles.active : ""}
                  onClick={() => setPage(index)}
                >
                  {index + 1}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={gradesPage.last}
              onClick={() => setPage(page + 1)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
