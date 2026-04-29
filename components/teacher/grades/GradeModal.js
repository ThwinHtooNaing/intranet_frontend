"use client";

import styles from "./GradeModal.module.css";

export default function GradeModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <div className={styles.iconBox}>
              <span className="material-symbols-outlined">icon</span>
            </div>

            <div>
              <h2>Assign/Update Grade</h2>
              <p>Adjust academic record for student profile</p>
            </div>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.studentCard}>
            <div>
              <label>STUDENT NAME</label>
              <h3>Alex Thompson</h3>
            </div>

            <div>
              <label>STUDENT ID</label>
              <p>STU-2024-0012</p>
            </div>

            <div>
              <label>COURSE</label>
              <p>CS101 - Intro to Programming</p>
            </div>

            <div>
              <label>MAJOR</label>
              <p>Comp. Science</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Current Score</label>
              <div className={styles.scoreInput}>
                <input type="number" defaultValue="85" />
                <span>/ 100</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>Grade Symbol</label>
              <select defaultValue="B+">
                <option>A</option>
                <option>A-</option>
                <option>B+</option>
                <option>B</option>
                <option>C+</option>
                <option>C</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>

          <button className={styles.update}>
            Update Grade
          </button>
        </div>
      </div>
    </div>
  );
}