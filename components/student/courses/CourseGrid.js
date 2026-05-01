import styles from "./CourseGrid.module.css";


export default function CourseGrid({courses, onSelect }) {
  return (
    <>
      <div className={styles.header}>
        <h1>My Courses</h1>
        <p>You are currently enrolled in 6 active courses.</p>
      </div>

      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <div className={styles.courseCard} key={course.code}>
            {/* COURSE CODE */}
            <span className={styles.code}>{course.code}</span>

            {/* TITLE */}
            <h3>{course.title}</h3>

            {/* TEACHER */}
            <p className={styles.teacher}>{course.teacher}</p>

            {/* EXTRA INFO */}
            <div className={styles.infoBox}>
              {course.schedules.map((sc) => (
                <div className={styles.info} key={sc.id}>
                  <span>{sc.dayOfWeek}</span>
                  <span>📅 {sc.startTime}</span>
                  <span>📍 {sc.room}</span>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button className={styles.viewBtn} onClick={() => onSelect(course)}>
              View Course →
            </button>
          </div>
        ))}
      </div>
    </>
  );
}