import styles from "./WeeklyCalendar.module.css";

const days = ["MON\n18", "TUE\n19", "WED\n20", "THU\n21", "FRI\n22"];
const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function WeeklyCalendar() {
  return (
    <div className={styles.card}>
      <div className={styles.days}>
        <div></div>
        {days.map((day) => (
          <div key={day}>
            <span>{day.split("\n")[0]}</span>
            <strong>{day.split("\n")[1]}</strong>
          </div>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.times}>
          {times.map((time) => (
            <span key={time}>{time}</span>
          ))}
        </div>

        <div className={styles.grid}>
          <div className={`${styles.event} ${styles.blue} ${styles.monMorning}`}>
            <small>09:00 - 11:00</small>
            <h4>Advanced Data Structures</h4>
            <p>📍 Hall 4B</p>
          </div>

          <div className={`${styles.event} ${styles.purple} ${styles.tueMid}`}>
            <small>11:00 - 12:30</small>
            <h4>Digital Ethics & Law</h4>
            <p>📍 Room 202</p>
          </div>

          <div className={`${styles.event} ${styles.blue} ${styles.wedMorning}`}>
            <small>09:00 - 11:00</small>
            <h4>Advanced Data Structures</h4>
            <p>📍 Hall 4B</p>
          </div>

          <div className={`${styles.event} ${styles.purple} ${styles.thuMid}`}>
            <small>11:00 - 12:30</small>
            <h4>Digital Ethics & Law</h4>
            <p>📍 Room 202</p>
          </div>

          <div className={`${styles.event} ${styles.orange} ${styles.monLab}`}>
            <small>14:00 - 16:00</small>
            <h4>Machine Learning Lab</h4>
            <p>📍 Computing Lab A</p>
          </div>

          <div className={`${styles.event} ${styles.orange} ${styles.wedLab}`}>
            <small>14:00 - 16:00</small>
            <h4>Machine Learning Lab</h4>
            <p>📍 Computing Lab A</p>
          </div>

          <div className={`${styles.event} ${styles.red} ${styles.tueClub}`}>
            <small>16:00 - 17:30</small>
            <h4>CS Society Meeting</h4>
            <p>Student Union Rm 12</p>
          </div>

          <div className={`${styles.event} ${styles.gray} ${styles.friOffice}`}>
            <h4>Faculty Office Hours</h4>
          </div>
        </div>
      </div>
    </div>
  );
}