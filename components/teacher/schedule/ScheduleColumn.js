import ScheduleCard from "./ScheduleCard";
import styles from "./ScheduleColumn.module.css";

export default function ScheduleColumn({ day }) {
  return (
    <div className={styles.column}>
      <div className={styles.dayHeader}>
        <span>{day.day}</span>
        <h2>{day.date}</h2>
      </div>

      <div className={styles.cards}>
        {day.items.map((item, index) => (
          <ScheduleCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}