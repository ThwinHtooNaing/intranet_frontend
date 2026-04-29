import styles from "./ScheduleMain.module.css";
import WeeklyCalendar from "./WeeklyCalendar";
import ScheduleSidebar from "./ScheduleSidebar";

export default function ScheduleMain() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Weekly Schedule</h1>
        <p>Spring Semester 2024 • Week 12 (March 18 - 22)</p>
      </div>

      <div className={styles.layout}>
        <WeeklyCalendar />
        <ScheduleSidebar />
      </div>
    </div>
  );
}