import styles from "./GradeTable.module.css";

const data = [
  ["ECON-402", "Advanced Macroeconomics", "Dr. Sarah Jenkins", "Fall 2023", "A"],
  ["STAT-315", "Statistical Modeling II", "Prof. Michael Chen", "Spring 2024", "B+"],
  ["BUSI-250", "Global Markets & Ethics", "Dr. Emily Watson", "Fall 2023", "C"],
  ["DESN-110", "Data Visualization", "Prof. David Miller", "Spring 2024", "A"],
  ["COMM-101", "Public Speaking", "Dr. Lisa Ray", "Fall 2023", "D"],
];

export default function GradeTable() {
  return (
    <div className={styles.card}>
      <h2>Course Grades & Feedback</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course</th>
            <th>Instructor</th>
            <th>Term</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
                <td>{row[3]}</td>
              <td className={styles.grade}>{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}