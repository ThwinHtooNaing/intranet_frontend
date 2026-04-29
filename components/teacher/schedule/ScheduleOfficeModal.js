"use client";

import styles from "./ScheduleOfficeModal.module.css";

export default function ScheduleOfficeModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <div className={styles.iconBox}>
              <span className="material-symbols-outlined">i</span>
            </div>
            <h2>Schedule Office Hours</h2>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <form className={styles.form}>
          <div className={styles.field}>
            <label>SELECT DATE</label>
            <div className={styles.inputIcon}>
              <input type="text" defaultValue="03/14/2024" />
              <span className="material-symbols-outlined">i</span>
            </div>
          </div>

          <div className={styles.twoGrid}>
            <div className={styles.field}>
              <label>START TIME</label>
              <div className={styles.inputIcon}>
                <input type="text" defaultValue="02:00 PM" />
                <span className="material-symbols-outlined">i</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>END TIME</label>
              <div className={styles.inputIcon}>
                <input type="text" defaultValue="04:30 PM" />
                <span className="material-symbols-outlined">i</span>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>ROOM / LOCATION</label>
            <div className={styles.inputIcon}>
              <input
                type="text"
                placeholder="e.g. Building A, Room 204 or Zoom Link"
              />
              <span className="material-symbols-outlined">i</span>
            </div>
          </div>

          <label className={styles.toggleRow}>
            <input type="checkbox" />
            <span></span>
            <p>Make this a weekly recurring slot</p>
          </label>
        </form>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>
          <button className={styles.submit}>
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}