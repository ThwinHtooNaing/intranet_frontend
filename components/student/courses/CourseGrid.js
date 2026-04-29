import styles from "./CourseGrid.module.css";

const courses = [
  {
    code: "MAT-402",
    title: "Advanced Calculus II",
    teacher: "Prof. Sarah Jenkins",
    time: "Mon, Wed, Fri • 10:00 AM",
    location: "Engineering Hall, Room 402",
  },
  {
    code: "DSA-201",
    title: "Digital Systems Architecture",
    teacher: "Dr. Michael Chen",
    time: "Tue, Thu • 1:30 PM",
    location: "Room 210",
  },
  {
    code: "COM-105",
    title: "Professional Communication",
    teacher: "Prof. David Wilson",
    time: "Mon • 4:00 PM",
    location: "Virtual",
  },
];

export default function CourseGrid({ onSelect }) {
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
            <div className={styles.info}>
              <span>📅 {course.time}</span>
              <span>📍 {course.location}</span>
            </div>

            {/* BUTTON */}
            <button
              className={styles.viewBtn}
              onClick={() => onSelect(course)}
            >
              View Course →
            </button>
          </div>
        ))}
      </div>
    </>
  );
}