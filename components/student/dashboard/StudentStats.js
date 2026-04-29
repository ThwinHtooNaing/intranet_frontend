import styles from "./StudentStats.module.css";

export default function StudentStats() {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <span>GPA Preview</span>
        <h2>3.80</h2>
        <p className={styles.green}>↗ +0.15 from last semester</p>
      </div>

      <div className={styles.statCard}>
        <span>Total Courses Enrolled</span>
        <h2>5</h2>
        <p>▣ 18 Credit Hours Total</p>
      </div>

      <div className={styles.progressCard}>
        <span>Term Progress</span>
        <h2>72% Completed</h2>

        <div className={styles.progressBar}>
          <div></div>
        </div>

        <div className={styles.progressInfo}>
          <p>18/25 weeks completed</p>
            <p>6 Weeks Remaining</p>
        </div>
      </div>
    </div>
  );
}