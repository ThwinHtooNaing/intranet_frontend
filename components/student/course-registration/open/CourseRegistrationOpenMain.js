"use client";

import { useState } from "react";
import styles from "./CourseRegistrationOpenMain.module.css";
import SubmittedCourses from "./SubmittedCourses";
import RegistrationStatusPanel from "./RegistrationStatusPanel";
import AddCourseModal from "./AddCourseModal";

export default function CourseRegistrationOpenMain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Course Registration</h1>
          <p>
            Browse available courses and build your schedule for the upcoming
            Spring 2026 academic term.
          </p>
        </div>

        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          + Add New Course
        </button>
      </div>

      <div className={styles.layout}>
        <div>
          <div className={styles.filterBox}>
            <div>
              <label>Search Catalog</label>
              <input placeholder="e.g. Data Structures" />
            </div>

            <div>
              <label>Department</label>
              <select>
                <option>All Departments</option>
                <option>Computer Science</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          <SubmittedCourses />

          <div className={styles.infoBox}>
            ⓘ Submissions can be modified until final advisor approval is
            granted.
          </div>
        </div>

        <RegistrationStatusPanel />
      </div>

      {showModal && <AddCourseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}