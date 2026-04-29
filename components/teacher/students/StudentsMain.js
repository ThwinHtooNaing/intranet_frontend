import StudentStats from "./StudentStats";
import StudentTable from "./StudentTable";
import TopPerformers from "./TopPerformers";
import styles from "./StudentsMain.module.css";

export default function StudentsMain() {
  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div>
          <h1>Student Directory</h1>
          <p>Manage and track student academic progress across all sections.</p>
        </div>

        <div className={styles.filters}>
          <button>
            <span>COURSE</span>
            All Courses
            <b>⌄</b>
          </button>

          <button>
            <span>SECTION</span>
            All Sections
            <b>⌄</b>
          </button>
        </div>
      </div>

      <StudentStats />

      <div className={styles.contentGrid}>
        <StudentTable />
        <TopPerformers />
      </div>
    </div>
  );
}