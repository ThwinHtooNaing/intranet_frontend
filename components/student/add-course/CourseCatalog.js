"use client";

import { useState } from "react";
import styles from "./CourseCatalog.module.css";

const initialCourses = [
  {
    code: "CS302",
    credits: "4 Credits",
    title: "Data Structures & Algorithms",
    teacher: "Dr. Helena Vance",
  },
  {
    code: "MATH201",
    credits: "3 Credits",
    title: "Linear Algebra II",
    teacher: "Prof. Marcus Thorne",
  },
  {
    code: "ARTS110",
    credits: "2 Credits",
    title: "Modern Digital Design",
    teacher: "Sarah Jenkins",
  },
  {
    code: "BIO405",
    credits: "4 Credits",
    title: "Advanced Genetics",
    teacher: "Dr. Anita Gupta",
  },
];

export default function CourseCatalog() {
  const [selected, setSelected] = useState([]);

  const handleAdd = (code) => {
    if (selected.includes(code)) return;
    setSelected([...selected, code]);
  };

  return (
    <div className={styles.grid}>
      {initialCourses.map((course) => {
        const isAdded = selected.includes(course.code);

        return (
          <div className={styles.card} key={course.code}>
            <div className={styles.top}>
              <span>{course.code}</span>
              <b>{course.credits}</b>
            </div>

            <h2>{course.title}</h2>

            <p>{course.teacher}</p>

            {/* BUTTON */}
            {isAdded ? (
              <button className={styles.addedBtn}>
                ✓ Added to Schedule
              </button>
            ) : (
              <button
                className={styles.addBtn}
                onClick={() => handleAdd(course.code)}
              >
                ⊕ Add to Schedule
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}