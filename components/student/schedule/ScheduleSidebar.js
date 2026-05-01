import styles from "./ScheduleSidebar.module.css";

const dayOrder = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const dayMap = {
  SUNDAY: "SUN",
  MONDAY: "MON",
  TUESDAY: "TUE",
  WEDNESDAY: "WED",
  THURSDAY: "THU",
  FRIDAY: "FRI",
  SATURDAY: "SAT",
  SUN: "SUN",
  MON: "MON",
  TUE: "TUE",
  WED: "WED",
  THU: "THU",
  FRI: "FRI",
  SAT: "SAT",
};

function timeToMinutes(time) {
  if (!time) return 0;
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function getDurationHours(startTime, endTime) {
  const diff = timeToMinutes(endTime) - timeToMinutes(startTime);
  return Math.max(diff / 60, 0);
}

function formatTime(time) {
  return time?.slice(0, 5) || "-";
}

function getTodayKey() {
  return dayOrder[new Date().getDay()];
}

function flattenSchedules(courses = []) {
  return courses.flatMap((course) =>
    (course.schedules || []).map((schedule) => ({
      id: schedule.id,
      title: course.title,
      code: course.code,
      sectionCode: course.sectionCode,
      day: dayMap[schedule.dayOfWeek?.toUpperCase()],
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      room: schedule.room,
      credits: course.credits || 0,
    })),
  );
}

export default function ScheduleSidebar({ courses = [] }) {
  const schedules = flattenSchedules(courses);
  const today = getTodayKey();

  const totalHours = schedules.reduce(
    (sum, item) => sum + getDurationHours(item.startTime, item.endTime),
    0,
  );

  const totalCredits = courses.reduce(
    (sum, course) => sum + (course.credits || 0),
    0,
  );

  const todayClasses = schedules
    .filter((item) => item.day === today)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  const upcomingClasses = schedules
    .filter((item) => item.day !== today)
    .sort((a, b) => {
      const todayIndex = dayOrder.indexOf(today);
      const aDistance = (dayOrder.indexOf(a.day) - todayIndex + 7) % 7 || 7;
      const bDistance = (dayOrder.indexOf(b.day) - todayIndex + 7) % 7 || 7;

      return (
        aDistance - bDistance ||
        timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
      );
    })
    .slice(0, 3);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <h2>Week Overview</h2>

        <div className={styles.row}>
          <span>Total Schedule Hours</span>
          <strong>{totalHours.toFixed(1)} hrs</strong>
        </div>

        <div className={styles.row}>
          <span>Total Credits</span>
          <strong>{totalCredits}</strong>
        </div>

        <div className={styles.row}>
          <span>Enrolled Courses</span>
          <strong>{courses.length}</strong>
        </div>

        <div className={styles.progress}>
          <div
            style={{ width: `${Math.min((totalCredits / 21) * 100, 100)}%` }}
          />
        </div>

        <p className={styles.small}>Credit Load: {totalCredits}/21 credits</p>
      </div>

      <div className={styles.card}>
        <h2>Today’s Classes</h2>

        {todayClasses.length === 0 ? (
          <p className={styles.empty}>No classes today.</p>
        ) : (
          todayClasses.map((item) => (
            <div className={styles.classItem} key={`${item.id}-${item.code}`}>
              <span>
                {formatTime(item.startTime)} - {formatTime(item.endTime)}
              </span>

              <div>
                <h3>{item.title}</h3>
                <p>
                  {item.room || "No room"} • Section {item.sectionCode}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.card}>
        <h2>Upcoming</h2>

        {upcomingClasses.length === 0 ? (
          <p className={styles.empty}>No upcoming classes.</p>
        ) : (
          upcomingClasses.map((item) => (
            <div className={styles.classItem} key={`${item.id}-${item.code}`}>
              <span>{item.day}</span>

              <div>
                <h3>{item.title}</h3>
                <p>
                  {formatTime(item.startTime)} - {formatTime(item.endTime)}
                  {" • "}
                  {item.room || "No room"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
