"use client";

import { useState } from "react";
import GradeStats from "./GradeStats";
import GradeTable from "./GradeTable";
import GradeCharts from "./GradeCharts";
import GradeModal from "./GradeModal";
import styles from "./GradesMain.module.css";

export default function GradesMain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div>
          <p className={styles.breadcrumb}>COURSES › GRADEBOOK</p>
          <h1>Gradebook</h1>
        </div>

        <div className={styles.actions}>
          <div>
            <label>SELECT COURSE</label>
            <select>
              <option>CS101: Introduction to Computer Science</option>
            </select>
          </div>

          <button>
            <span className="material-symbols-outlined">download</span>
            Export PDF
          </button>
        </div>
      </div>

      <GradeStats />
      <GradeTable onOpenModal={() => setShowModal(true)} />
      <GradeCharts />

      {showModal && <GradeModal onClose={() => setShowModal(false)} />}
    </div>
  );
}