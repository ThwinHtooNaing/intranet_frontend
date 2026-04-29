import styles from "./ScheduleCard.module.css";

export default function ScheduleCard({ item }) {
  if (item.empty) {
    return <div className={styles.empty}>{item.text}</div>;
  }

  const cardClass =
    item.type === "office"
      ? styles.office
      : item.type === "meeting"
      ? styles.meeting
      : styles.card;

  return (
    <div className={cardClass}>
      <div className={styles.meta}>
        <span className={styles.code}>{item.code}</span>
        <p>{item.time}</p>
      </div>

      <h3>{item.title}</h3>

      <div className={styles.location}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>

        <p>{item.location}</p>
      </div>
    </div>
  );
}