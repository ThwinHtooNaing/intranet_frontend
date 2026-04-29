import styles from "./ScheduleSidebar.module.css";

export default function ScheduleSidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* ===== WEEK OVERVIEW ===== */}
      <div className={styles.card}>
        <h2>Week Overview</h2>

        <div className={styles.row}>
          <span>Total Credit Hours</span>
          <strong>18.5 hrs</strong>
        </div>

        <div className={styles.row}>
          <span>Lectures</span>
          <strong>12 hrs</strong>
        </div>

        <div className={styles.row}>
          <span>Labs</span>
          <strong>4 hrs</strong>
        </div>

        <div className={styles.row}>
          <span>Seminars</span>
          <strong>2.5 hrs</strong>
        </div>

        <div className={styles.progress}>
          <div></div>
        </div>

        <p className={styles.small}>Semester Progress: 75%</p>
      </div>

      {/* ===== TODAY'S CLASSES ===== */}
      <div className={styles.card}>
        <h2>Today’s Classes</h2>

        <div className={styles.classItem}>
          <span>09:00 - 11:00</span>
          <div>
            <h3>Data Structures</h3>
            <p>Hall 4B</p>
          </div>
        </div>

        <div className={styles.classItem}>
          <span>14:00 - 16:00</span>
          <div>
            <h3>Machine Learning Lab</h3>
            <p>Lab A</p>
          </div>
        </div>
      </div>

      {/* ===== UPCOMING ===== */}
      <div className={styles.card}>
        <h2>Upcoming</h2>

        <div className={styles.classItem}>
          <span>Tomorrow</span>
          <div>
            <h3>Digital Ethics</h3>
            <p>Room 202</p>
          </div>
        </div>

        <div className={styles.classItem}>
          <span>Friday</span>
          <div>
            <h3>Office Hours</h3>
            <p>Faculty Office</p>
          </div>
        </div>
      </div>
    </aside>
  );
}