"use client";

import styles from "./AddCourseModal.module.css";
import {useState,useEffect} from 'react';

export default function AddCourseModal({ onClose }) {
  const [terms, setTerms] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [termId, setTermId] = useState("");
  const [sectionCode, setSectionCode] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/terms`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setTerms(data);
      } catch (err) {
        console.error("Failed to fetch terms:", err);
      }
    };

    fetchTerms();
  }, []);

  const [code, setCode] = useState("");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!code) return;

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/courses/${code}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!res.ok) {
          setCourse({title:'Not Found'});
          return;
        }

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const teacherId = storedUser?.userId;

    const payload = {
      courseId: course?.id,
      termId: Number(termId),
      teacherId: Number(teacherId),
      sectionCode,
      capacity: Number(capacity),
      status: "OPEN",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/create/course-offerings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        },
      );

      console.log(payload);

      if (!res.ok) throw new Error("Failed");

      onClose();
      alert(res.ok)
    } catch (err) {
      console.error(err);
      alert(error)
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Add New Course</h2>
            <p>Create a course offering with one section.</p>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.gridTwo}>
            <div className={styles.field}>
              <label>COURSE CODE</label>
              <input
                type="text"
                placeholder="e.g. CS480"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
              />
            </div>

            <div className={styles.field}>
              <label>STUDENT CAPACITY</label>
              <div className={styles.inputIcon}>
                <input
                  type="number"
                  placeholder="0"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>COURSE TITLE</label>
            <input
              type="text"
              value={course?.title || ""}
              readOnly
              placeholder="Auto-filled"
            />
          </div>

          <div className={styles.gridTwo}>
            <div className={styles.field}>
              <label>ACADEMIC TERM</label>
              <select
                value={termId}
                onChange={(e) => setTermId(e.target.value)}
              >
                <option value="" disabled>
                  Select term
                </option>

                {terms.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.termType} {t.academicYear}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>SECTION CODE</label>
              <input
                type="text"
                placeholder="e.g. A"
                value={sectionCode}
                onChange={(e) => setSectionCode(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewIcon}>
              <span className="material-symbols-outlined">b</span>
            </div>
            <div>
              <h4>COURSE PREVIEW</h4>
              <p>
                {course
                  ? `${course.code} - ${course.title}`
                  : "Enter course code to preview"}
              </p>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>

            <button type="submit" className={styles.create} >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}