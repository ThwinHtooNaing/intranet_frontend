"use client";

import { useState,useEffect } from "react";
import ScheduleColumn from "./ScheduleColumn";
import ScheduleOfficeModal from "./ScheduleOfficeModal";
import styles from "./ScheduleMain.module.css";


export default function ScheduleMain() {
  const [showModal, setShowModal] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.userId;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/schedules/${userId}/schedule`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await res.json();
      setScheduleData(data);
    };

    fetchSchedule();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div>
          <h1>Add schedule for Sections</h1>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => setShowModal(true)}
            className={styles.officeBtn}
          >
            <span className="material-symbols-outlined">+</span>
            Add Schedules 
          </button>
        </div>
      </div>

      <div className={styles.weekGrid}>
        {scheduleData.map((day) => (
          <ScheduleColumn key={day.day} day={day} />
        ))}
      </div>

      {showModal && (
        <ScheduleOfficeModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}