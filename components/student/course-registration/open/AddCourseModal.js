import styles from "./AddCourseModal.module.css";
import { useEffect, useState } from "react";

export default function AddCourseModal({ onClose }) {
  const [status, setStatus] = useState(null);
  const [courseCode, setCourseCode] = useState("");
  const [courseData, setCourseData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [user, setUser] = useState(null);

  const handleEnrollCourse = async () => {

    const userId = user?.userId;
    if (!courseData || !status?.termId) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/new/enroll?userId=53`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // make this dynamic
          body: JSON.stringify({
            termId: 10,
            sectionId: Number(selectedSectionId),
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to enroll course");
      }

      const data = await res.json();
      console.log("Enrollment created:", data);

      onClose();
    } catch (err) {
      // console.error("Failed to enroll course:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    // if (!courseCode || !status?.termId) return;

    // make it dynamic

    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/courses/${courseCode}?termId=${10}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!res.ok) {
          setCourseData(null);
          return;
        }

        const data = await res.json();
        setCourseData(data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setCourseData(null);
      }
    };

    const delay = setTimeout(fetchCourse, 500);

    return () => clearTimeout(delay);
  }, [courseCode, status?.termId]);

  console.log(error);

  

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const data = JSON.parse(item);
      setUser(data);
    }
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Enroll New Course</h2>
            <p>Create a course offering with one section.</p>
          </div>

          <button onClick={onClose}>×</button>
        </div>

        <div className={styles.body}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Course Code</label>
              <input
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
                placeholder="e.g. CS480"
              />
            </div>

            <div className={styles.field}>
              <label>Course Title</label>
              <input
                value={courseData?.title || "Not Found"}
                placeholder="Auto-filled"
                disabled
              />
            </div>

            <div className={styles.field}>
              <label>Academic Term</label>
              <select disabled>
                <option value={status?.termId || ""}>
                  {status
                    ? `${status.termType} ${status.academicYear}`
                    : "Loading term..."}
                </option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Professor</label>
              <input
                value={courseData?.teacherName || ""}
                placeholder="Auto-filled"
                disabled
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>Section</label>

              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                disabled={!courseData?.sections?.length}
              >
                <option value="">Select section</option>

                {courseData?.sections?.map((section) => (
                  <option
                    key={section.id}
                    value={section.id}
                    disabled={section.availableSeats <= 0}
                  >
                    S{section.sectionCode} — {section.availableSeats} seats left
                  </option>
                ))}
              </select>
            </div>

            {selectedSectionId && (
              <div className={`${styles.field} ${styles.full}`}>
                <label>Schedule</label>

                <div className={styles.scheduleGrid}>
                  {courseData.sections
                    .find((s) => String(s.id) === String(selectedSectionId))
                    ?.schedules.map((schedule) => (
                      <div key={schedule.id} className={styles.scheduleCard}>
                        <strong>{schedule.dayOfWeek}</strong>
                        <span>
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                        <small>{schedule.room}</small>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className={`${styles.field} ${styles.full}`}>
              <label>Prerequisites</label>

              {courseData?.prerequisites?.length > 0 ? (
                <div className={styles.prerequisiteGrid}>
                  {courseData.prerequisites.map((item) => (
                    <div
                      key={item.courseId}
                      className={styles.prerequisiteCard}
                    >
                      <div className={styles.code}>{item.code}</div>

                      <div className={styles.title}>{item.title}</div>

                      <div className={styles.meta}>
                        {item.credits} credits
                        {item.minGradeSymbol && ` • Min ${item.minGradeSymbol}`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <input value="No prerequisites" disabled />
              )}
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>Course Description</label>
              <textarea
                value={courseData?.description || ""}
                placeholder="Auto-filled"
                disabled
              />
            </div>
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.footer}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.create}
            disabled={!courseData || !selectedSectionId || isSubmitting}
            onClick={handleEnrollCourse}
          >
            {isSubmitting ? "Enrolling..." : "Enroll Course"}
          </button>
        </div>
      </div>
    </div>
  );
}
