"use client";

import { useEffect, useState } from "react";
import styles from "./UpcomingSchedule.module.css";

export default function UpcomingSchedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
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

        const formatted = data.flatMap((day) =>
          day.items.map((item) => ({
            day: day.day.slice(0, 3),
            date: "-",
            title: item.title,
            time: item.time,
            location: item.location,
            type: item.code,
          })),
        );

        setSchedules(formatted);
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3 style={{ color: "#00645d" }}>Upcoming Schedule</h3>
        <button>Full Calendar</button>
      </div>

      {schedules.map((item, index) => (
        <div className={styles.row} key={index}>
          <div className={styles.dateBox}>
            <span>{item.day}</span>
            <strong>{item.date}</strong>
          </div>

          <div className={styles.info}>
            <h4>{item.title}</h4>
            <p>
              <span className="material-symbols-outlined">schedule</span>
              {item.time}
              <span className="material-symbols-outlined">location_on</span>
              {item.location}
            </p>
          </div>

          <span className={styles.badge}>{item.type}</span>
        </div>
      ))}
    </section>
  );
}
