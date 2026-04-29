import styles from "./CourseTable.module.css";

const courses = [
  {
    code: "CS101",
    title: "Introduction to Computer Science",
    students: "124 Students enrolled",
    term: "SPRING 2024",
    progress: 75,
    icon: "code",
  },
  {
    code: "UXD302",
    title: "Advanced Interaction Design",
    students: "45 Students enrolled",
    term: "SPRING 2024",
    progress: 40,
    icon: "palette",
  },
  {
    code: "MTH205",
    title: "Discrete Mathematics II",
    students: "182 Students enrolled",
    term: "FALL 2023",
    progress: 100,
    icon: "calculate",
  },
  {
    code: "SWE400",
    title: "Software Engineering Capstone",
    students: "32 Students enrolled",
    term: "SPRING 2024",
    progress: 15,
    icon: "groups",
  },
];

export default function CourseTable() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h2>Active Curriculum</h2>
          <span>6 Active</span>
        </div>

        <div className={styles.filters}>
          <button>All Terms⌄</button>
          <button className={styles.iconBtn}>☷</button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>COURSE CODE</span>
          <span>COURSE TITLE</span>
          <span>TERM</span>
          <span>PROGRESS</span>
          <span>ACTIONS</span>
        </div>

        {courses.map((course) => (
          <div className={styles.tableRow} key={course.code}>
            <strong className={styles.code}>{course.code}</strong>

            <div className={styles.courseTitle}>
             
              <div>
                <h3>{course.title}</h3>
                <p>{course.students}</p>
              </div>
            </div>

            <span className={styles.term}>{course.term}</span>

            <div className={styles.progress}>
              <div>
                <span style={{ width: `${course.progress}%` }}></span>
              </div>
              <b>{course.progress}%</b>
            </div>

            <div className={styles.actions}>
              <button>
                <span className="material-symbols-outlined">eye</span>
                View Students
              </button>
              <span className={styles.more}>⋮</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>Showing 1-4 of 6 active courses</p>

        <div className={styles.pagination}>
          <button>‹</button>
          <button className={styles.pageActive}>1</button>
          <button>2</button>
          <button>›</button>
        </div>
      </div>
    </section>
  );
}