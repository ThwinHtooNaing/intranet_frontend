import styles from "./SubmittedCourses.module.css";

function formatSchedule(schedules = []) {
  if (!schedules.length) return "No schedule";

  return schedules
    .map(
      (item) =>
        `${item.dayOfWeek} ${item.startTime?.slice(0, 5)}–${item.endTime?.slice(0, 5)}`,
    )
    .join(", ");
}

export default function SubmittedCourses({ courses = [] }) {
  return (
    <section>
      <div className={styles.titleRow}>
        <h2>Enrolled Courses</h2>
        <span>{courses.length} course(s)</span>
      </div>

      <div className={styles.list}>
        {courses.length === 0 ? (
          <p className={styles.empty}>No enrolled courses found.</p>
        ) : (
          courses.map((course) => (
            <div className={styles.card} key={course.enrollmentId}>
              <div className={styles.main}>
                <h3>
                  {course.title} <span>{course.code}</span>
                </h3>

                <div className={styles.meta}>
                  <span>◉ {course.credits} Credits</span>
                  <span>♙ {course.teacherName || "No teacher assigned"}</span>
                  <span>◷ {formatSchedule(course.schedules)}</span>
                  <span>▣ Term: {course.term}</span>
                  <span># Section: {course.sectionCode}</span>
                </div>

                <p className={styles.seats}>
                  ▣ {course.availableSeats} seats available
                </p>
              </div>

              <button onClick={()=>alert("Coming Soon Features.")}>Withdraw</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
