import styles from "./RegistrationStatusPanel.module.css";

export default function RegistrationStatusPanel() {
  return (
    <aside className={styles.side}>
      <div className={styles.card}>
        <h3>Credit Summary</h3>

        <div className={styles.creditRow}>
          <div>
            <strong>13.0</strong>
            <span>Total Submitted</span>
          </div>

          <div>
            <strong>15.0</strong>
            <span>Semester Target</span>
          </div>
        </div>

        <div className={styles.progress}>
          <div></div>
        </div>

        <div className={styles.statusGrid}>
          <div>
            <span>Approved</span>
            <strong>3.0</strong>
          </div>

          <div>
            <span>Pending</span>
            <strong>10.0</strong>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h3>Registration Cycle</h3>

        <div className={styles.timeline}>
          <div className={styles.done}>
            <b>✓</b>
            <div>
              <h4>Form Submitted</h4>
              <p>Oct 12, 10:45 AM</p>
            </div>
          </div>

          <div className={styles.active}>
            <b>●</b>
            <div>
              <h4>Advisor Review</h4>
              <p>Active Review</p>
            </div>
          </div>

          <div className={styles.locked}>
            <b>🔒</b>
            <div>
              <h4>Final Enrollment</h4>
              <p>Expected Oct 15</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}