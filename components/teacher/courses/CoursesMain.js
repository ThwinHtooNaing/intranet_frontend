"use client";

import { useState } from "react";
import CourseStats from "./CourseStats";
import CourseTable from "./CourseTable";
import AddCourseModal from "./AddCourseModal";
import styles from "./CoursesMain.module.css";

export default function CoursesMain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div>
          <p className={styles.breadcrumb}>PORTAL › MY COURSES</p>
          <h1>My Courses</h1>
          <p className={styles.subtitle}>
            Manage and monitor your active teaching curriculum for the 2024
            academic year.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className={styles.newBtn}
          >
            ＋ New Course
          </button>
        </div>
      </div>

      <CourseStats />
      <CourseTable />

      {showModal && (
        <AddCourseModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}