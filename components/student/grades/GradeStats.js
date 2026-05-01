import styles from "./GradeStats.module.css";

export default function GradeStats({ summary }) {
  const cumulativeGpa = summary?.cumulativeGpa ?? "N/A";
  const earnedCredits = summary?.earnedCredits ?? 0;
  const totalMajorCredits = summary?.totalMajorCredits ?? 0;
  const completedCourseCount = summary?.completedCourseCount ?? 0;

  const completion =
    totalMajorCredits > 0
      ? Math.round((earnedCredits / totalMajorCredits) * 100)
      : 0;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span>Cumulative GPA</span>
        <h2>{cumulativeGpa}</h2>
        <p className={styles.badge}>
          {summary?.majorName ?? "Academic Program"}
        </p>
      </div>

      <div className={styles.card}>
        <span>Credits Earned</span>
        <h2>
          {earnedCredits} / {totalMajorCredits}
        </h2>

        <div className={styles.progress}>
          <div style={{ width: `${Math.min(completion, 100)}%` }}></div>
        </div>
      </div>

      <div className={styles.card}>
        <span>Completed Courses</span>
        <h2>{completedCourseCount}</h2>
        <p>Final graded courses</p>
      </div>

      <div className={styles.circleCard}>
        <h2>{completion}%</h2>
        <p>Course Completion</p>
      </div>
    </div>
  );
}
