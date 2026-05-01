"use client";

import { useState,useEffect } from "react";
import styles from "./CourseRegistrationOpenMain.module.css";
import EnrolledCourses from "./SubmittedCourses";
import RegistrationStatusPanel from "./RegistrationStatusPanel";
import AddCourseModal from "./AddCourseModal";

export default function CourseRegistrationOpenMain() {
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
      const fetchStatus = async () => {
  
       
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/registration-status`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
  
          const data = await res.json();
          setStatus(data);
        } catch (err) {
          console.error("Failed to fetch registration status:", err);
        }
      };
  
      fetchStatus();
    }, []);

    useEffect(() => {
      if (!status?.termId) return;

      const fetchEnrollments = async () => {
        try {
          // make this dynamic userId, termId
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/enrollments?userId=1&termId=10`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          const data = await res.json();
          setCourses(data);
        } catch (err) {
          console.error("Failed to fetch enrolled courses:", err);
        }
      };

      fetchEnrollments();
    }, [status?.termId]);

     const filteredCourses = courses.filter((course) => {
       const keyword = search.toLowerCase();

       return (
         course.title?.toLowerCase().includes(keyword) ||
         course.code?.toLowerCase().includes(keyword) ||
         course.teacherName?.toLowerCase().includes(keyword) ||
         course.sectionCode?.toLowerCase().includes(keyword)
       );
     });

     console.log(courses);
     


  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Course Registration</h1>
          <p>
            Browse available courses and build your schedule for the upcoming{" "}
            <span>
              <span className={styles.termType}>{status?.termType}</span>{" "}
              <span className={styles.academicYear}>
                {status?.academicYear}
              </span>
            </span>{" "}
            academic term.
          </p>
        </div>

        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          + Enroll New Course
        </button>
      </div>

      <div className={styles.layout}>
        <div>
          <div className={styles.filterBox}>
            <div>
              <label>Search Catalog</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. Data Structures"
              />
            </div>
          </div>

          <EnrolledCourses courses={filteredCourses} />

          <div className={styles.infoBox}>
            ⓘ Enrolled can be modified until Deadline or Paid
          </div>
        </div>

        <RegistrationStatusPanel termId={status?.termId} />
      </div>

      {showModal && <AddCourseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}