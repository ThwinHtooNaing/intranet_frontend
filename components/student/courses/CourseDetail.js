import styles from "./CourseDetail.module.css";

const materials = [
  ["Week 8: Balanced Search Trees (AVL vs Red-Black)", "Detailed comparison of rotation mechanics and balancing constraints.", "PDF • 4.2 MB", "LECTURE NOTES"],
  ["Week 7: Recurrence Relations and Master Theorem", "Video recording of Monday's session including problem set walkthrough.", "MP4 • 120 MB", "RECORDING"],
  ["Week 6: Binary Search Tree Implementation", "C++ source code examples for insertion, deletion, and tree traversals.", "ZIP • 1.1 MB", "SOURCE CODE"],
  ["Week 5: Advanced Hash Table Optimization", "Techniques for minimizing collisions and improving lookup times.", "ZIP • 0.8 MB", "SOURCE CODE"],
  ["Week 4: Graph Traversal and Shortest Paths", "Comprehensive guide to BFS, DFS, and Dijkstra's algorithm.", "PDF • 3.5 MB", "LECTURE NOTES"],
];

const students = [
  ["1", "Sarah Chen", "CS Senior", "A+"],
  ["2", "Marcus Miller", "EE Junior", "A+"],
  ["3", "Elena Rodriguez", "CS Senior", "A"],
  ["-", "Alex Johnson", "You • Enrolled", "-"],
];

export default function CourseDetail({ course, onBack }) {
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={onBack}>
        ← Back to Courses
      </button>

      <div className={styles.kicker}>✦ Computer Science Department</div>

      <h1>{course.code}: {course.title}</h1>

      <div className={styles.infoRow}>
        <span>👤 {course.teacher}</span>
        <span>📅 Mon, Wed, Fri • 10:00 AM</span>
        <span>📍 Engineering Hall, Room 402</span>
        <strong>Semester 1, 2024</strong>
      </div>

      <div className={styles.contentGrid}>
        <section className={styles.materialCard}>
          <h2>📖 Lecture Materials</h2>

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
              <span>LIVE</span>
            </div>

            <div className={styles.tableHead}>
              <span>Rank</span>
              <span>Student</span>
              <span>Grade</span>
            </div>

            {students.map((s) => (
              <div
                className={`${styles.studentRow} ${
                  s[0] === "12" ? styles.currentUser : ""
                }`}
                key={s[0]}
              >
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
              Struggling with this course? Message your professor or visit office
              hours.
            </p>
            <button>Message Professor</button>
          </div>
        </aside>
      </div>
    </div>
  );
}