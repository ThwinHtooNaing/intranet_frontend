import styles from "./RegistrationTimeline.module.css";

const steps = [
  ["April 15", "Course Catalog Published", "done"],
  ["May 20", "Registration Opens", "active"],
  ["June 05", "Registration Closes", "next"],
  ["June 15", "Add/Drop Period Ends", "next"],
];

export default function RegistrationTimeline() {
  return (
    <aside className={styles.card}>
      <h2>Timeline</h2>

      <div className={styles.timeline}>
        {steps.map((step) => (
          <div
            key={step[0]}
            className={`${styles.step} ${
              step[2] === "active" ? styles.active : ""
            }`}
          >
            <span></span>
            <div>
              <small>{step[0]}</small>
              <h3>{step[1]}</h3>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}