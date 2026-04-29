"use client";

import { useState } from "react";
import ScheduleColumn from "./ScheduleColumn";
import ScheduleOfficeModal from "./ScheduleOfficeModal";
import styles from "./ScheduleMain.module.css";

const scheduleData = [
  {
    day: "MONDAY",
    date: "Oct 23",
    items: [
      {
        code: "CS-101",
        time: "09:00 - 10:30",
        title: "Intro to Python",
        location: "Room 304",
      },
      {
        code: "CS-202",
        time: "11:00 - 12:30",
        title: "Data Structures",
        location: "Lab 12",
      },
    ],
  },
  {
    day: "TUESDAY",
    date: "Oct 24",
    items: [
      {
        code: "CS-405",
        time: "10:00 - 11:30",
        title: "Machine Learning",
        location: "Hall B",
      },
      {
        empty: true,
        text: "No afternoon classes",
      },
    ],
  },
  {
    day: "WEDNESDAY",
    date: "Oct 25",
    items: [
      {
        code: "CS-101",
        time: "09:00 - 10:30",
        title: "Intro to Python",
        location: "Room 304",
      },
      {
        code: "CS-202",
        time: "11:00 - 12:30",
        title: "Data Structures",
        location: "Lab 12",
      },
      {
        type: "meeting",
        code: "DEPT",
        time: "14:00 - 15:30",
        title: "Faculty Meeting",
        location: "Conf Room A",
      },
    ],
  },
  {
    day: "THURSDAY",
    date: "Oct 26",
    items: [
      {
        code: "CS-405",
        time: "10:00 - 11:30",
        title: "Machine Learning",
        location: "Hall B",
      },
      {
        code: "CS-510",
        time: "14:00 - 16:00",
        title: "Advanced Algorithms",
        location: "Room 201",
      },
    ],
  },
  {
    day: "FRIDAY",
    date: "Oct 27",
    items: [
      {
        type: "office",
        code: "OFFICE",
        time: "09:00 - 11:00",
        title: "Office Hours",
        location: "Room 402",
      },
      {
        code: "CS-202",
        time: "11:00 - 12:30",
        title: "Data Structures (Lab)",
        location: "Lab 12",
      },
    ],
  },
];

export default function ScheduleMain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div>
          <h1>Weekly Academic Schedule</h1>
          <p>October 23 - October 27, 2023</p>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => setShowModal(true)}
            className={styles.officeBtn}
          >
            <span className="material-symbols-outlined">+</span>
            Schedule Office Hours
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