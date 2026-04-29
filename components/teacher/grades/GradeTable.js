import styles from "./GradeTable.module.css";

const students = [
  {
    name: "Alex Thompson",
    id: "STU-2024-0012",
    course: "CS101",
    major: "Comp. Science",
    grade: "A",
    score: "92/100",
    updated: "Last updated: 2 days ago",
  },
  {
    name: "Elena Rodriguez",
    id: "STU-2024-0045",
    course: "CS101",
    major: "Software Eng.",
    grade: "A-",
    score: "89/100",
    updated: "Last updated: Yesterday",
  },
  {
    name: "Jordan Smith",
    id: "STU-2024-0082",
    course: "CS101",
    major: "Data Science",
    grade: "B+",
    score: "78/100",
    updated: "Last updated: 4 hours ago",
    orange: true,
  },
  {
    name: "Maria Garcia",
    id: "STU-2024-0033",
    course: "CS101",
    major: "Information Tech.",
    grade: "--",
    score: "Ungraded",
    updated: "Pending Submission",
    ungraded: true,
  },
];

export default function GradeTable({ onOpenModal }) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>Student Performance</h2>
          <span>ACTIVE</span>
          <b>TERM 2</b>
        </div>

        <div className={styles.icons}>
          <span className="material-symbols-outlined">icon</span>
          <span className="material-symbols-outlined">icon</span>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.head}>
          <span>STUDENT / ENROLLMENT NAME</span>
          <span>STUDENT ID</span>
          <span>COURSE</span>
          <span>MAJOR</span>
          <span>GRADE SYMBOL</span>
          <span>SCORE</span>
          <span>ACTIONS</span>
        </div>

        {students.map((student) => (
          <div className={styles.row} key={student.id}>
            <p>{student.name}</p>
            <p>{student.id}</p>
            <p>{student.course}</p>
            <p>{student.major}</p>

            <span
              className={`${styles.grade} ${
                student.orange ? styles.orange : ""
              }`}
            >
              {student.grade}
            </span>

            <div>
              <h3 className={student.ungraded ? styles.ungraded : ""}>
                {student.score}
              </h3>
              <small className={student.ungraded ? styles.pending : ""}>
                {student.updated}
              </small>
            </div>

            <button
              type="button"
              onClick={onOpenModal}
              className={student.ungraded ? styles.primaryBtn : ""}
            >
              Assign / Update Grade
            </button>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>Showing 4 of 42 students</p>

        <div className={styles.pagination}>
          <button type="button">‹</button>
          <button type="button" className={styles.active}>1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">›</button>
        </div>
      </div>
    </section>
  );
}