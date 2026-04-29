import styles from "./TopPerformers.module.css";

export default function TopPerformers() {
  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        <h2>Top Performers</h2>
        <span>This Month</span>
      </div>

      <div className={styles.performer}>
        <h3>Lila Thorne</h3>
        <p>GPA: 4.0 • 100% Attendance</p>
      </div>

      <div className={styles.performer}>
        <h3>Kevin Ortega</h3>
        <p>GPA: 3.9 • 98% Attendance</p>
      </div>

      <div className={styles.performer}>
        <h3>Kevin Ortega</h3>
        <p>GPA: 3.9 • 98% Attendance</p>
      </div>

      <div className={styles.insight}>
        <div className={styles.insightTitle}>
          <span className="material-symbols-outlined">trending_up</span>
          <h3>Class Insight</h3>
        </div>

        <p>
          Overall performance in Section A-1 has increased by 12% following the
          last workshop.
        </p>
      </div>
    </aside>
  );
}