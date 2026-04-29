import styles from "./StudentTable.module.css";

const students = [
  {
    name: "Julian Rivers",
    id: "#29481",
    major: "Mathematics",
    course: "Adv. Calculus",
    attendance: 98,
  },
  {
    name: "Elena Vance",
    id: "#29502",
    major: "Physics",
    course: "Physics II",
    attendance: 72,
  },
  {
    name: "Marcus Thorne",
    id: "#29118",
    major: "Comp. Sci.",
    course: "Comp Sci 101",
    attendance: 45,
  },
];

export default function StudentTable() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Enrollment Registry</h2>
      </div>

      <div className={styles.table}>
        <div className={styles.head}>
          <span>STUDENT NAME</span>
          <span>STUDENT ID</span>
          <span>MAJOR</span>
          <span>COURSE</span>
          <span>ATTENDANCE</span>
        </div>

        {students.map((student) => (
          <div className={styles.row} key={student.id}>
            <h3>{student.name}</h3>
            <p>{student.id}</p>
            <p>{student.major}</p>
            <p>{student.course}</p>

            <div className={styles.attendance}>
              <div>
                <span style={{ width: `${student.attendance}%` }}></span>
              </div>
              <b>{student.attendance}%</b>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>Showing 1-10 of 1,284 students</p>

        <div className={styles.pagination}>
          <button>‹</button>
          <button className={styles.active}>1</button>
          <button>2</button>
          <button>3</button>
          <button>›</button>
        </div>
      </div>
    </section>
  );
}