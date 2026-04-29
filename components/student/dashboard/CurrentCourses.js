import styles from "./CurrentCourses.module.css";

const courses = [
  {
    title: "Advanced Calculus II",
    teacher: "Prof. Sarah Jenkins",
  },
  {
    title: "Digital Systems Architecture",
    teacher: "Dr. Michael Chen",
  },
  {
    title: "Professional Communication",
    teacher: "Prof. David Wilson",
  },
  {
    title: "Full-Stack Web Dev",
    teacher: "Dr. Emily Zhang",
  },
  {
    title: "Quantum Physics Lab",
    teacher: "Prof. Robert Miller",
  },
  {
    title: "Database Management",
    teacher: "Dr. Sarah Thompson",
  },
];

export default function CurrentCourses() {
  return (
    <section className={styles.section}>
      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <div className={styles.courseCard} key={course.title}>
            <h3>{course.title}</h3>
            <p>{course.teacher}</p>

            <span className={styles.label}>Progress</span>

            <button className={styles.viewBtn}>
              View Course <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}