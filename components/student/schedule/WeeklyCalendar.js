import { useState } from "react";
import styles from "./WeeklyCalendar.module.css";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const dayMap = {
  MONDAY: "MON",
  TUESDAY: "TUE",
  WEDNESDAY: "WED",
  THURSDAY: "THU",
  FRIDAY: "FRI",
  SATURDAY: "SAT",
  SUNDAY: "SUN",
  MON: "MON",
  TUE: "TUE",
  WED: "WED",
  THU: "THU",
  FRI: "FRI",
  SAT: "SAT",
  SUN: "SUN",
};

const startHour = 8;
const endHour = 18;
const hourHeight = 120;

const times = Array.from({ length: endHour - startHour + 1 }, (_, index) => {
  return `${String(startHour + index).padStart(2, "0")}:00`;
});

function timeToMinutes(time) {
  if (!time) return 0;
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function isOverlap(a, b) {
  return a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes;
}

function flattenSchedules(courses = []) {
  return courses.flatMap((course, courseIndex) =>
    (course.schedules || []).map((schedule) => {
      const normalizedDay = dayMap[schedule.dayOfWeek?.toUpperCase()];

      return {
        ...schedule,
        eventKey: `${schedule.id}-${course.code}-${course.sectionCode}`,
        courseTitle: course.title,
        courseCode: course.code,
        sectionCode: course.sectionCode,
        colorIndex: courseIndex % 5,
        normalizedDay,
        startMinutes: timeToMinutes(schedule.startTime),
        endMinutes: timeToMinutes(schedule.endTime),
      };
    }),
  );
}


function getEventStyle(event) {
  const dayIndex = days.indexOf(event.normalizedDay);
  const calendarStart = startHour * 60;

  const top = ((event.startMinutes - calendarStart) / 60) * hourHeight;

  const stackGap = 10;
  const stackOffset = event.stackIndex * stackGap;

  return {
    left: `calc(${dayIndex} * var(--day-width) + ${12 + stackOffset}px)`,
    top: `${top + stackOffset}px`,
    zIndex: 100 - event.stackIndex,
  };
}

function addOverlapIndexes(events, orderMap = {}) {
  return events.map((event) => {
    const sameDayOverlaps = events.filter(
      (other) =>
        other.normalizedDay === event.normalizedDay && isOverlap(event, other),
    );

    const groupKeys = sameDayOverlaps.map((e) => e.eventKey);

    const groupKey = groupKeys.sort().join("|");

    const orderedKeys = orderMap[groupKey] || groupKeys;

    const stackIndex = orderedKeys.indexOf(event.eventKey);

    return {
      ...event,
      stackIndex,
      stackCount: groupKeys.length,
      groupKey,
      groupKeys,
    };
  });
}

export default function WeeklyCalendar({ courses = [] }) {
  const [orderMap, setOrderMap] = useState({});
  const [activeEventKey, setActiveEventKey] = useState(null);

  const events = addOverlapIndexes(flattenSchedules(courses), orderMap);

    
  function handleEventClick(event) {
    if (event.stackCount <= 1) return;

    setOrderMap((prev) => {
      const key = event.groupKey;

      const currentOrder = prev[key] || event.groupKeys;

      const newOrder = [...currentOrder.slice(1), currentOrder[0]];

      return {
        ...prev,
        [key]: newOrder,
      };
    });
  }

  return (
    <div className={styles.card}>
      <div className={styles.scrollArea}>
        <div className={styles.calendar}>
          <div className={styles.days}>
            <div className={styles.corner}></div>

            {days.map((day) => (
              <div key={day} className={styles.day}>
                <span>{day}</span>
              </div>
            ))}
          </div>

          <div className={styles.body}>
            <div className={styles.times}>
              {times.map((time) => (
                <span key={time}>{time}</span>
              ))}
            </div>

            <div className={styles.grid}>
              {events.length === 0 && (
                <div className={styles.empty}>No enrolled schedule yet.</div>
              )}

              {events.map((event) => {
                const isActive = activeEventKey === event.eventKey;

                return (
                  <button
                    type="button"
                    key={event.eventKey}
                    className={`${styles.event} ${
                      styles[`color${event.colorIndex}`]
                    } ${event.stackCount > 1 ? styles.stacked : ""} ${
                      event.stackIndex === 0 ? styles.topEvent : ""
                    }`}
                    style={getEventStyle(event)}
                    onClick={() => handleEventClick(event)}
                  >
                    <small>
                      {event.startTime?.slice(0, 5)} -{" "}
                      {event.endTime?.slice(0, 5)}
                    </small>

                    <h4>{event.courseTitle}</h4>

                    <p>
                      {event.courseCode} • Section {event.sectionCode}
                    </p>

                    <p>📍 {event.room || "No room"}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
