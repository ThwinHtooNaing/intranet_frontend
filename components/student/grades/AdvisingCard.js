import styles from "./AdvisingCard.module.css";

export default function AdvisingCard() {
  return (
    <div className={styles.card}>
      <h2>Academic Advising</h2>
      <p>
        Based on your current grades, you are eligible for the Honors Thesis
        program next year.
      </p>

      <button>Schedule Advising Session</button>
    </div>
  );
}