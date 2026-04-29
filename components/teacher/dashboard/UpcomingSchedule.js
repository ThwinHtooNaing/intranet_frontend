import styles from "./UpcomingSchedule.module.css";

const schedules = [
  {
    day: "MON",
    date: "14",
    title: "Quantum Mechanics",
    time: "10:30 AM - 12:00 PM",
    location: "Science Building, Room 402",
    type: "LECTURE",
  },
  {
    day: "MON",
    date: "14",
    title: "Faculty Strategy Meeting",
    time: "02:00 PM - 03:00 PM",
    location: "Google Meet • Join Link",
    type: "INTERNAL",
  },
  {
    day: "TUE",
    date: "15",
    title: "Advanced Calculus",
    time: "09:00 AM - 11:00 AM",
    location: "Math Annex, Room 108",
    type: "SEMINAR",
  },
];

export default function UpcomingSchedule() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>Upcoming Schedule</h3>
        <button>Full Calendar</button>
      </div>

      {schedules.map((item, index) => (
        <div className={styles.row} key={index}>
          <div className={styles.dateBox}>
            <span>{item.day}</span>
            <strong>{item.date}</strong>
          </div>

          <div className={styles.info}>
            <h4>{item.title}</h4>
            <p>
              <span className="material-symbols-outlined">schedule</span>
              {item.time}
              <span className="material-symbols-outlined">location_on</span>
              {item.location}
            </p>
          </div>

          <span className={styles.badge}>{item.type}</span>
        </div>
      ))}
    </section>
  );
}