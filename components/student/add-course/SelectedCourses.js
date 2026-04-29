import styles from "./SelectedCourses.module.css";

const selected = [
  ["CSC302", "Data Structures", "3 Cr"],
  ["CS301", "Operating Systems", "3 Cr"],
];

export default function SelectedCourses() {
  return (
    <aside className={styles.card}>
      <h2>🧺 Selected Courses</h2>
      <p>Fall 2024 Enrollment</p>

      <div className={styles.list}>
        {selected.map((item) => (
          <div className={styles.item} key={item[0]}>
            <div>
              <span>{item[0]}</span>
              <small>{item[2]}</small>
              <h3>{item[1]}</h3>
            </div>
            <button>×</button>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <span>Total Credits:</span>
        <strong>5.0</strong>
      </div>

      <div className={styles.min}>
        <span>Minimum required:</span>
        <strong>12.0</strong>
      </div>

      <button className={styles.complete}>Complete Enrollment</button>

      <p className={styles.saved}>Changes saved automatically</p>
    </aside>
  );
}