import styles from "./StudentStats.module.css";

export default function StudentStats() {
  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <div className={styles.iconBox}>
          <span className="material-symbols-outlined">i</span>
        </div>

        <span className={styles.badge}>+4%</span>

        <p>TOTAL STUDENTS</p>
        <h2>1,284</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.iconBoxBlue}>
          <span className="material-symbols-outlined">i</span>
        </div>

        <span className={styles.badgeBlue}>Stable</span>

        <p>ACTIVE NOW</p>
        <h2>1,150</h2>
      </div>
    </div>
  );
}