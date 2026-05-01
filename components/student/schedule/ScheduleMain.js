"use client"

import styles from "./ScheduleMain.module.css";
import WeeklyCalendar from "./WeeklyCalendar";
import ScheduleSidebar from "./ScheduleSidebar";
import { useEffect, useState } from "react";

export default function ScheduleMain() {
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const data = JSON.parse(item);
      setUser(data);
    }
  }, []);

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
     if (!status?.termId || !user?.userId) return;

     const fetchEnrollments = async () => {
       try {
         // Make Dynamic
         const res = await fetch(
           `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/enrollments?userId=${user?.userId}&termId=10`,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           },
         );

         const data = await res.json();
         setCourses(data);
       } catch (err) {
         console.error("Failed to fetch schedule courses:", err);
       }
     };

     fetchEnrollments();
   }, [status?.termId, user?.userId]);


  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Weekly Schedule</h1>
        <p>
          {status
            ? `${status.termType} Semester ${status.academicYear}`
            : "Loading current semester..."}
        </p>
      </div>

      <div className={styles.layout}>
        <WeeklyCalendar courses={courses} />
        <ScheduleSidebar courses={courses} />
      </div>
    </div>
  );
}