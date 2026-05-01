"use client"
import StudentStats from "./StudentStats";
import StudentTable from "./StudentTable";
import TopPerformers from "./TopPerformers";
import { useEffect, useState } from "react";
import styles from "./StudentsMain.module.css";

export default function StudentsMain() {

   const [coursesPage, setCoursesPage] = useState(null);
   const [selectedCourseId, setSelectedCourseId] = useState("");
   const [selectedSectionId, setSelectedSectionId] = useState("");

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
         console.error("Failed to fetch course table:", err);
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

    const sectionsForSelectedCourse = courseSections.filter(
      (item) => item.courseOfferingId === Number(selectedCourseId),
    );

    console.log(selectedCourseId)
    console.log(selectedSectionId)
  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div>
          <h1>Student Directory</h1>
          <p>Manage and track student academic progress across all sections.</p>
        </div>

        <div className={styles.filters}>
          <div>
            <label>COURSE</label>
            <select
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                setSelectedSectionId("");
              }}
            >
              <option value="" disabled>
                Select course
              </option>

              {uniqueCourses.map((course) => (
                <option
                  key={course.courseOfferingId}
                  value={course.courseOfferingId}
                >
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>SECTION</label>
            <select
              value={selectedSectionId}
              onChange={(e) => setSelectedSectionId(e.target.value)}
              disabled={!selectedCourseId}
            >
              <option value="" disabled>
                Select section
              </option>

              {sectionsForSelectedCourse.map((section) => (
                <option key={section.sectionId} value={section.sectionId}>
                  Section {section.sectionCode}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <StudentStats />

      <div className={styles.contentGrid}>
        <StudentTable />
        <TopPerformers courseOfferingId={3} />
      </div>
    </div>
  );
}