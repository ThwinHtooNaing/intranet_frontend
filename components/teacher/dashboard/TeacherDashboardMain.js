import StatCards from "./StatCards";
import UpcomingSchedule from "./UpcomingSchedule";
import QuickFilters from "./QuickFilters";
import PerformanceCard from "./PerformanceCard";
import styles from "./TeacherDashboardMain.module.css";

export default function TeacherDashboardMain() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h2>Welcome back, Prof. Einstein</h2>
        <p>Here is what is happening across your courses today.</p>
      </div>

      <StatCards />

      <div className={styles.mainGrid}>
        <UpcomingSchedule />

        <div className={styles.sideColumn}>
          <QuickFilters />
          <PerformanceCard />
        </div>
      </div>
    </div>
  );
}