import styles from "./RegistrationTimeline.module.css";

function formatDate(dateString) {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });
}

function getStatus(stepDate, isOpen, type) {
  const now = new Date(stepDate);

  if (type === "open" && isOpen) return "active";
  if (new Date(stepDate) < new Date()) return "done";

  return "next";
}

export default function RegistrationTimeline({ registrationStatus }) {
  if (!registrationStatus) return null;

  const steps = [
    {
      date: registrationStatus.registrationOpen,
      title: "Registration Opens",
      type: "open",
    },
    {
      date: registrationStatus.registrationClose,
      title: "Registration Closes",
      type: "close",
    },
  ];

  return (
    <aside className={styles.card}>
      <h2>Timeline</h2>

      <div className={styles.timeline}>
        {steps.map((step) => (
          <div
            key={step.type}
            className={`${styles.step} ${
              getStatus(step.date, registrationStatus.isOpen, step.type) ===
              "active"
                ? styles.active
                : ""
            } ${
              getStatus(step.date, registrationStatus.isOpen, step.type) ===
              "done"
                ? styles.done
                : ""
            }`}
          >
            <span></span>

            <div>
              <small>{formatDate(step.date)}</small>
              <h3>{step.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
