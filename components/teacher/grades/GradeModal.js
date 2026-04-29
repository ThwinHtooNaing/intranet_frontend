"use client";

import styles from "./GradeModal.module.css";
import {useState,useEffect} from 'react';

export default function GradeModal({ onClose, data }) {
  if (!data) return null;
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/grades/grade-symbol`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setSymbols(data);
      } catch (err) {
        console.error("Failed to load symbols:", err);
      }
    };

    fetchSymbols();
  }, []);
  const [gradeSymbolId, setGradeSymbolId] = useState(data?.gradeSymbolId || "");
  const [isFinal, setIsFinal] = useState(data?.isFinal ?? false);


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <div className={styles.iconBox}>
              <span className="material-symbols-outlined">grade</span>
            </div>

            <div>
              <h2>Assign/Update Grade</h2>
              <p>Adjust academic record for student profile</p>
            </div>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.studentCard}>
            <div>
              <label>STUDENT NAME</label>
              <h3>{data.fullName}</h3>
            </div>

            <div>
              <label>STUDENT ID</label>
              <p>{data.studentCode}</p>
            </div>

            <div>
              <label>COURSE</label>
              <p>
                {data.courseCode} - {data.courseTitle}
              </p>
            </div>

            <div>
              <label>MAJOR</label>
              <p>{data.majorName || "-"}</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Grade Symbol</label>

              <select
                value={gradeSymbolId}
                onChange={(e) => setGradeSymbolId(e.target.value)}
              >
                <option value="">Select grade</option>

                {symbols.map((s) => (
                  <option key={s.symbolId} value={s.symbolId}>
                    {s.gradeSymbol}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Finalize Grade</label>

              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={isFinal}
                  onChange={(e) => setIsFinal(e.target.checked)}
                  disabled={data.isFinal}
                />
                <span>{isFinal ? "Final (Locked)" : "Draft"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>

          <button
            className={styles.update}
            disabled={data.isFinal}
            onClick={async () => {
              if (!gradeSymbolId) {
                alert("Please select a grade symbol.");
                return;
              }

              if (isFinal && !data.isFinal) {
                const confirmFinal = confirm(
                  "Finalizing this grade will lock it permanently. You cannot change it again. Continue?",
                );

                if (!confirmFinal) return;
              }
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/grades/update/${data.gradeId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify({
                    gradeSymbolId: Number(gradeSymbolId),
                    isFinal: isFinal,
                  }),
                },
              );

              if (!res.ok) {
                const text = await res.text();
                alert(text);
                return;
              }

              onClose();
            }}
          >
            {data.isFinal ? "Finalized" : "Update Grade"}
          </button>
        </div>
      </div>
    </div>
  );
}
