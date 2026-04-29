"use client";

import styles from "./ScheduleOfficeModal.module.css";
import {useState,useEffect} from 'react';

export default function ScheduleOfficeModal({ onClose }) {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
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

  const sectionsForSelectedCourse = courseSections.filter(
    (item) => item.courseOfferingId === Number(selectedCourseId),
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submiting")

    try {
      const payload = {
        sectionId: Number(selectedSectionId),
        dayOfWeek: day,
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
        room: location,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/schedules`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to create schedule");

      onClose(); 
    } catch (err) {
      console.error("Schedule error:", err);
    }
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <div className={styles.iconBox}>
              <span className="material-symbols-outlined">i</span>
            </div>
            <h2>Schedule Hours</h2>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.twoGrid}>
            <div className={styles.field}>
              <label>Course</label>
              <div className={styles.inputIcon}>
                <select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    setSelectedSectionId("");
                  }}
                  required
                >
                  <option value="">Select Course</option>

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
            </div>
            <div className={styles.field}>
              <label>Section</label>
              <div className={styles.inputIcon}>
                <select
                  value={selectedSectionId}
                  onChange={(e) => setSelectedSectionId(e.target.value)}
                  disabled={!selectedCourseId}
                  required
                >
                  <option value="">Select Section</option>

                  {sectionsForSelectedCourse.map((section) => (
                    <option key={section.sectionId} value={section.sectionId}>
                      Section {section.sectionCode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>DAY</label>
            <div className={styles.inputIcon}>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
              >
                <option value="">Select day</option>
                <option value="SATURDAY">Saturday</option>
                <option value="SUNDAY">Sunday</option>
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
              </select>
            </div>
          </div>

          <div className={styles.twoGrid}>
            <div className={styles.field}>
              <label>START TIME</label>
              <div className={styles.inputIcon}>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>END TIME</label>
              <div className={styles.inputIcon}>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  min={startTime}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>ROOM / LOCATION</label>
            <div className={styles.inputIcon}>
              <input
                type="text"
                placeholder="e.g. Building A, Room 204"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.footer}>
            <button onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.submit}>
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}