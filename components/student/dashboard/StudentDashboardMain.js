import styles from "./StudentDashboardMain.module.css";
import StudentStats from "./StudentStats";
import CurrentCourses from "./CurrentCourses";
import QuickTranscripts from "./QuickTranscripts";

export default function StudentDashboardMain() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.hero}>
        <h1>Hi, Student 👋</h1>
        <p>
          Welcome back to your academic portal. Here's your status for the
          Semester.
        </p>
      </div>

      <StudentStats />
      <CurrentCourses />
      <QuickTranscripts />
    </div>
  );
}