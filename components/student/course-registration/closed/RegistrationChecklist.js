import styles from "./RegistrationChecklist.module.css";

const items = [
  ["✅", "GPA Threshold (2.5+)", "Current: 3.85", "good"],
  ["✅", "Major Requirements", "Sophomore core complete", "good"],
  ["✅", "No Financial Holds", "Account balance: $0.00", "good"],
  ["⚠️", "Advisor Approval", "Pending review", "warning"],
];

export default function RegistrationChecklist() {
  return (
    <section className={styles.card}>
      <h2>Prerequisite Checklist</h2>

      <div className={styles.grid}>
        {items.map((item) => (
          <div
            key={item[1]}
            className={`${styles.item} ${
              item[3] === "warning" ? styles.warning : ""
            }`}
          >
            <span>{item[0]}</span>
            <div>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}