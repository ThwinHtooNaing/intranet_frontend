"use client";

import { useState } from "react";
import styles from "./CoursesMain.module.css";
import CourseGrid from "./CourseGrid";
import CourseDetail from "./CourseDetail";

export default function CoursesMain() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className={styles.wrapper}>
      {!selectedCourse ? (
        <CourseGrid onSelect={setSelectedCourse} />
      ) : (
        <CourseDetail
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}