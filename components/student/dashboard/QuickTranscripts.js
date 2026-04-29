import styles from "./QuickTranscripts.module.css";

const transcripts = [
  ["ASTRO-302", "Astrophysics I", "4.0", "Active", "A"],
  ["LIT-455", "Advanced Literature", "3.0", "Active", "A-"],
  ["PHYS-201", "Quantum Mechanics", "4.0", "Active", "B+"],
];

export default function QuickTranscripts() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Quick Transcripts</h2>

        <div className={styles.tabs}>
          <span className={styles.active}>Fall 2024</span>
          <span>Summer 2024</span>
          <span>Spring 2024</span>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Status</th>
            <th>Current Grade</th>
          </tr>
        </thead>

        <tbody>
          {transcripts.map((row) => (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>
                <span className={styles.status}>{row[3]}</span>
              </td>
              <td className={styles.grade}>{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}