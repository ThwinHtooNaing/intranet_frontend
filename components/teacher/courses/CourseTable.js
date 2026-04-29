"use client";

import { useEffect, useState } from "react";
import styles from "./CourseTable.module.css";

export default function CourseTable() {
  const [coursesPage, setCoursesPage] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.userId;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/${userId}/course-table?page=${page}&size=4`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setCoursesPage(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [page]);

  const courses = coursesPage?.content || [];

  const start = coursesPage?.totalElements
    ? coursesPage.number * coursesPage.size + 1
    : 0;

  const end = coursesPage
    ? Math.min(
        (coursesPage.number + 1) * coursesPage.size,
        coursesPage.totalElements,
      )
    : 0;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h2>Offered Courses</h2>
          <span>{coursesPage?.totalElements ?? 0} Active</span>
        </div>

        <div className={styles.filters}>
          <button>All Terms⌄</button>
          <button className={styles.iconBtn}>☷</button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>COURSE CODE</span>
          <span>COURSE TITLE</span>
          <span>TERM</span>
          <span>SECTION</span>
          <span>CAPACITY</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {courses.map((course) => (
          <div className={styles.tableRow} key={course.sectionId}>
            <strong className={styles.code}>{course.code}</strong>

            <div className={styles.courseTitle}>
              <div>
                <h3>{course.title}</h3>
                <p>
                  {course.enrolledCapacity ?? 0}/{course.capacity} Students
                  enrolled
                </p>
              </div>
            </div>

            <span className={styles.term}>{course.term}</span>

            <span>{course.sectionCode}</span>

            <span>{course.capacity}</span>

            <span>{course.status}</span>

            <div className={styles.actions}>
              <span className={styles.more}>⋮</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>
          Showing {start}-{end} of {coursesPage?.totalElements ?? 0} active
          courses
        </p>

        <div className={styles.pagination}>
          <button
            disabled={coursesPage?.first}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </button>

          {Array.from({ length: coursesPage?.totalPages || 0 }).map(
            (_, index) => (
              <button
                key={index}
                className={page === index ? styles.pageActive : ""}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            ),
          )}

          <button
            disabled={coursesPage?.last}
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
