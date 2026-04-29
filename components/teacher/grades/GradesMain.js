"use client";

import { useState,useEffect } from "react";
import GradeStats from "./GradeStats";
import GradeTable from "./GradeTable";
import GradeCharts from "./GradeCharts";
import GradeModal from "./GradeModal";
import styles from "./GradesMain.module.css";

export default function GradesMain() {
  const [coursesPage, setCoursesPage] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.userId;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/${userId}/course-table?page=0&size=100`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setCoursesPage(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const courseSections = coursesPage?.content || [];

  const uniqueCourses = courseSections.filter(
    (item, index, self) =>
      index ===
      self.findIndex((c) => c.courseOfferingId === item.courseOfferingId),
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div>
          <p className={styles.breadcrumb}>COURSES › GRADEBOOK</p>
          <h1>Gradebook</h1>
        </div>

        <div className={styles.actions}>
          <div>
            <label>SELECT COURSE</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">Select course</option>

              {uniqueCourses.map((course) => (
                <option
                  key={course.courseOfferingId}
                  value={course.courseOfferingId}
                >
                  {course.code}: {course.title}
                </option>
              ))}
            </select>
          </div>

          <button
            // disabled={!selectedCourseId}
            onClick={async () => {
              // if (!selectedCourseId) {
              //   alert("Select course first");
              //   return;
              // }

              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/course-offerings/${3}/export`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  },
                );

                if (!res.ok) {
                  alert("Failed to export PDF");
                  return;
                }

                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "grades-report.pdf";
                document.body.appendChild(a);
                a.click();

                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                console.error("PDF export error:", err);
              }
            }}
          >
            <span className="material-symbols-outlined">download</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* make dynamic */}

      <GradeStats courseOfferingId={4} />
      <GradeTable
        onOpenModal={(student) => {
          setSelectedStudent(student);
          setShowModal(true);
        }}
        courseOfferingId={selectedCourseId}
      />

      {/* // make it dynamic */}
      <GradeCharts courseOfferingId={4} />

      {showModal && (
        <GradeModal
          data={selectedStudent}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}