import styles from "./GradesMain.module.css";
import GradeStats from "./GradeStats";
import GradeTable from "./GradeTable";
import GPAChart from "./GPAChart";
import AdvisingCard from "./AdvisingCard";

export default function GradesMain() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Academic Performance</h1>
        <p>Fall Semester 2024 • Junior Year</p>
      </div>

      <GradeStats />
      <GradeTable />

      <div className={styles.bottomGrid}>
        <GPAChart />
        <AdvisingCard />
      </div>
    </div>
  );
}