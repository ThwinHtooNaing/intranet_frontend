import styles from "./GradeStats.module.css";

export default function GradeStats() {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span>Cumulative GPA</span>
        <h2>3.88</h2>
        <p className={styles.badge}>Top 5% of Department</p>
      </div>

      <div className={styles.card}>
        <span>Credits Earned</span>
        <h2>92 / 120</h2>
        <div className={styles.progress}>
          <div style={{ width: "75%" }}></div>
        </div>
      </div>

      <div className={styles.card}>
        <span>Dean's List</span>
        <h2>3 Semesters</h2>
        <p>Eligible for Fall 2024</p>
      </div>

      <div className={styles.circleCard}>
        <h2>85%</h2>
        <p>Course Completion</p>
      </div>
    </div>
  );
}