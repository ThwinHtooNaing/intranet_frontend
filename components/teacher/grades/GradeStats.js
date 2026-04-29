import styles from "./GradeStats.module.css";

const stats = [
  {
    label: "TOTAL STUDENTS",
    value: "42",
    sub: "Class Section A & B",
    icon: "icon",
  },
  {
    label: "CLASS AVERAGE",
    value: "84.5%",
    sub: "+2.4% from Midterm",
    icon: "icon",
  },
  {
    label: "PENDING GRADING",
    value: "08",
    sub: "Assignment #4",
    icon: "icon",
    danger: true,
  },
  {
    label: "COMPLETION RATE",
    value: "92%",
    sub: "Submissions received",
    icon: "icon",
  },
];

export default function GradeStats() {
  return (
    <div className={styles.stats}>
      {stats.map((item) => (
        <div className={styles.card} key={item.label}>
          <div>
            <p>{item.label}</p>
            <h2 className={item.danger ? styles.danger : ""}>{item.value}</h2>
            <span>{item.sub}</span>
          </div>

          <span className={`material-symbols-outlined ${styles.icon}`}>
            {item.icon}
          </span>
        </div>
      ))}
    </div>
  );
}