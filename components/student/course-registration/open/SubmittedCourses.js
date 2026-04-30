import styles from "./SubmittedCourses.module.css";

const courses = [
  {
    title: "Data Structures",
    code: "CS201",
    credits: "3 Credits",
    teacher: "Dr. Smith",
    time: "Mon/Wed 10:00–11:30",
    term: "Spring 2026",
    session: "141",
    seats: "12 seats available",
  },
  {
    title: "Algorithm Analysis",
    code: "CS302",
    credits: "4 Credits",
    teacher: "Prof. Williams",
    time: "Tue/Thu 14:00–15:30",
    term: "Spring 2026",
    session: "142",
    seats: "4 seats available",
  },
  {
    title: "Computer Architecture",
    code: "CS303",
    credits: "4 Credits",
    teacher: "Dr. Miller",
    time: "Mon/Wed 14:00–15:30",
    term: "Spring 2026",
    session: "141",
    seats: "8 seats available",
  },
];

export default function SubmittedCourses() {
  return (
    <section>
      <div className={styles.titleRow}>
        <h2>Submitted Courses</h2>
        <span></span>
      </div>

      <div className={styles.list}>
        {courses.map((course) => (
          <div className={styles.card} key={course.code}>
            <div className={styles.main}>
              <h3>
                {course.title} <span>{course.code}</span>
              </h3>

              <div className={styles.meta}>
                <span>◉ {course.credits}</span>
                <span>♙ {course.teacher}</span>
                <span>◷ {course.time}</span>
                <span>▣ Term: {course.term}</span>
                <span># Session: {course.session}</span>
              </div>

              <p className={styles.seats}>▣ {course.seats}</p>
            </div>

            <button>Withdraw</button>
          </div>
        ))}
      </div>
    </section>
  );
}