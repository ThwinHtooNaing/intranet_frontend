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
        <span className="material-symbols-outlined">i</span>
        <p>{item.location}</p>
      </div>
    </div>
  );
}