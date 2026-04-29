import styles from "./CourseStats.module.css";

const stats = [
  { label: "TOTAL STUDENTS", value: "842", badge: "+12%" },
  { label: "AVG. ATTENDANCE", value: "94%", bar: true },
  { label: "TOTAL COURSES", value: "14", badge: "2024" },
  { label: "ACTIVE COURSES", value: "6", badge: "Current" },
];

export default function CourseStats() {
  return (
    <div className={styles.stats}>
      {stats.map((item) => (
        <div className={styles.card} key={item.label}>
          <p>{item.label}</p>

          <div className={styles.row}>
            <h2>{item.value}</h2>

            {item.badge && <span>{item.badge}</span>}
            {item.bar && (
              <div className={styles.bar}>
                <div></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}