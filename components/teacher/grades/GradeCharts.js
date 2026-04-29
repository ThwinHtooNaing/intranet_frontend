import styles from "./GradeCharts.module.css";

export default function GradeCharts() {
  return (
    <div className={styles.grid}>
      <section className={styles.distribution}>
        <div className={styles.chartHeader}>
          <h2>Grade Distribution</h2>
          <span>Final Exam Target</span>
        </div>

        <div className={styles.fakeChart}>
          <span>F</span>
          <span>D</span>
          <span>C</span>
          <span>B</span>
          <span>A</span>
        </div>
      </section>

      <section className={styles.progress}>
        <h2>Term Progress</h2>

        <div className={styles.circle}>
          <div>
            <h3>70%</h3>
            <p>GRADED</p>
          </div>
        </div>

        <h4>12 Submissions Remaining</h4>
        <p>Next deadline: Friday, 5:00 PM</p>
      </section>
    </div>
  );
}