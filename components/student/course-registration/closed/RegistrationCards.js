import styles from "./RegistrationCards.module.css";

export default function RegistrationCards({ summary }) {
  const activeCredits = summary?.activeCredits ?? 0;
  const enrolledCourses = summary?.enrolledCourseCount ?? 0;
  const earnedCredits = summary?.earnedCredits ?? 0;
  const totalMajorCredits = summary?.totalMajorCredits ?? 0;

  const progress =
    totalMajorCredits > 0
      ? Math.round((earnedCredits / totalMajorCredits) * 100)
      : 0;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.icon}>📖</div>
        <span>Status</span>
        <h3>My Current Courses</h3>

        <div className={styles.footer}>
          <p>Active Credits</p>
          <strong>{activeCredits}</strong>
        </div>

        <div className={styles.progress}>
          <div style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>

        <small>{enrolledCourses} course(s) enrolled</small>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <span>Academic Progress</span>
        <h3>Degree Completion</h3>

        <div className={styles.stats}>
          <div>
            <strong>{earnedCredits}</strong>
            <p>Credits Earned</p>
          </div>

          <div>
            <strong>{totalMajorCredits}</strong>
            <p>Total Required</p>
          </div>
        </div>

        <p className={styles.note}>{progress}% completed</p>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>🎓</div>
        <span>Academic History</span>
        <h3>GPA Summary</h3>

        <div className={styles.stats}>
          <div>
            <strong>{summary?.cumulativeGpa ?? "N/A"}</strong>
            <p>Cumulative GPA</p>
          </div>

          <div>
            <strong>{summary?.completedCourseCount ?? 0}</strong>
            <p>Completed Courses</p>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>🏫</div>
        <span>Program</span>
        <h3>{summary?.majorName ?? "No Major Assigned"}</h3>

        <div className={styles.moneyRow}>
          <span>Faculty</span>
          <strong>{summary?.facultyName ?? "-"}</strong>
        </div>

        <div className={styles.moneyRow}>
          <span>Current Year</span>
          <strong>Year {summary?.currentYear ?? "-"}</strong>
        </div>

        <p className={styles.note}>
          Admission Year: {summary?.admissionYear ?? "-"}
        </p>
      </div>
    </div>
  );
}
