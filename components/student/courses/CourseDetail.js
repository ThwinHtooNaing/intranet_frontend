import styles from "./CourseDetail.module.css";

const materials = [
  [
    "Lecture Materials Coming Soon",
    "Your professor has not uploaded course materials yet.",
    "Future Feature",
    "MATERIALS",
  ],
  [
    "Assignments Coming Soon",
    "Assignments and submissions will be available here later.",
    "Future Feature",
    "ASSIGNMENTS",
  ],
];

const students = [
  ["-", "Top students feature", "Available in future version", "-"],
];

function formatSchedule(schedules = []) {
  if (!schedules.length) return "No schedule assigned";

  return schedules
    .map(
      (item) =>
        `${item.dayOfWeek} ${item.startTime?.slice(0, 5)}–${item.endTime?.slice(0, 5)}`,
    )
    .join(", ");
}

function formatRooms(schedules = []) {
  const rooms = schedules.map((item) => item.room).filter(Boolean);

  return rooms.length ? [...new Set(rooms)].join(", ") : "No room assigned";
}

export default function CourseDetail({ course, onBack }) {
  // console.log(course)
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={onBack}>
        ← Back to Courses
      </button>

      <div className={styles.kicker}>✦ {course.term}</div>

      <h1>
        {course.code}: {course.title}
      </h1>

      <div className={styles.infoRow}>
        <span>👤 Prof {course.teacherName || "No teacher assigned"}</span>
        <span>📅 {formatSchedule(course.schedules)}</span>
        <span>📍 {formatRooms(course.schedules)}</span>
        <strong>Section {course.sectionCode}</strong>
      </div>

      <div className={styles.contentGrid}>
        <section className={styles.materialCard}>
          <h2>📖 Course Materials</h2>

          {materials.map((item) => (
            <div className={styles.materialItem} key={item[0]}>
              <div className={styles.iconBox}>▣</div>

              <div>
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>

                <div className={styles.tags}>
                  <span>{item[2]}</span>
                  <span>{item[3]}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        <aside className={styles.sideArea}>
          <div className={styles.topCard}>
            <div className={styles.sideHeader}>
              <h2>🏆 Last Term's Top 3</h2>
              <span>SOON</span>
            </div>

            <div className={styles.tableHead}>
              <span>Rank</span>
              <span>Student</span>
              <span>Grade</span>
            </div>

            {students.map((s) => (
              <div className={styles.studentRow} key={s[1]}>
                <b>{s[0]}</b>
                <div>
                  <h4>{s[1]}</h4>
                  <p>{s[2]}</p>
                </div>
                <strong>{s[3]}</strong>
              </div>
            ))}
          </div>

          <div className={styles.helpCard}>
            <h2>Need Help?</h2>
            <p>
              Course messaging and professor office hours will be added later.
            </p>
            <button disabled>Coming Soon</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
