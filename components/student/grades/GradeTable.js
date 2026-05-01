import { useEffect, useState } from "react";
import styles from "./GradeTable.module.css";

export default function GradeTable() {
  const [user, setUser] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      setUser(JSON.parse(item));
    }
  }, []);

  function getGradeClass(grade) {
    if (!grade || grade === "-") return "";

    if (grade.startsWith("A")) return styles.gradeA;
    if (grade.startsWith("B")) return styles.gradeB;
    if (grade.startsWith("C")) return styles.gradeC;
    if (grade.startsWith("D") || grade.startsWith("F")) return styles.gradeLow;

    return "";
  }

  useEffect(() => {
    // if (!user?.id) return;

    const fetchGrades = async () => {
      try {
        const res = await fetch(
          // make this dynamic
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/grades?userId=6`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        console.log(res);

        if (!res.ok) {
          const message = await res.text();
          throw new Error(message || "Failed to fetch grades");
        }

        const data = await res.json();
        console.log(data);
        setGrades(Array.isArray(data) ? data : []);
        
      } catch (err) {
        console.error("Failed to fetch grades:", err);
        setGrades([]);
      }
    };

    fetchGrades();
  }, [user?.id]);


  console.log(grades)

  return (
    <div className={styles.card}>
      <h2>Course Grades & Feedback</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course</th>
            <th>Instructor</th>
            <th>Term</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {grades.length === 0 ? (
            <tr>
              <td colSpan="5" className={styles.empty}>
                No grades available yet.
              </td>
            </tr>
          ) : (
            grades.map((row) => (
              <tr key={row.enrollmentId}>
                <td>{row.courseCode}</td>
                <td>{row.courseTitle}</td>
                <td>{row.teacherName}</td>
                <td>{row.term}</td>
                <td>
                  <span
                    className={`${styles.grade} ${getGradeClass(row.grade)}`}
                  >
                    {row.grade}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
