import styles from "./QuickFilters.module.css";

export default function QuickFilters() {
  return (
    <section className={styles.card}>
      <h3>Quick Filters</h3>

      <div className={styles.filter}>
        <span className="material-symbols-outlined">school</span>
        <p>My Lectures</p>
        <b>8</b>
      </div>

      <div className={styles.filter}>
        <span className="material-symbols-outlined">groups</span>
        <p>Faculty Meetings</p>
        <b>3</b>
      </div>

      <div className={styles.filter}>
        <span className="material-symbols-outlined">calendar_month</span>
        <p>Office Hours</p>
        <b>2</b>
      </div>

      <button>View Full Calendar</button>
    </section>
  );
}