"use client";

import styles from "./AddCourseModal.module.css";

export default function AddCourseModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Add New Course</h2>
            <p>Fill in the details to create a new academic module.</p>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>

        <form className={styles.form}>
          <div className={styles.gridTwo}>
            <div className={styles.field}>
              <label>COURSE CODE</label>
              <input type="text" placeholder="e.g. CS102" />
            </div>

            <div className={styles.field}>
              <label>STUDENT CAPACITY</label>
              <div className={styles.inputIcon}>
                <input type="number" placeholder="0" />
                <span className="material-symbols-outlined">group</span>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>COURSE TITLE</label>
            <input type="text" placeholder="e.g. Advanced Machine Learning" />
          </div>

          <div className={styles.gridTwo}>
            <div className={styles.field}>
              <label>ACADEMIC TERM</label>
              <select defaultValue="">
                <option value="" disabled>Select term</option>
                <option>Spring 2024</option>
                <option>Fall 2024</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>COURSE DEPARTMENT</label>
              <select defaultValue="">
                <option value="" disabled>Select department</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Software Engineering</option>
              </select>
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewIcon}>
              <span className="material-symbols-outlined">b</span>
            </div>
            <div>
              <h4>COURSE PREVIEW</h4>
              <p>
                You are creating a new curriculum entry. Ensure all data follows
                the department guidelines.
              </p>
            </div>
          </div>
        </form>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>Cancel</button>
          <button className={styles.create}>Create Course</button>
        </div>
      </div>
    </div>
  );
}