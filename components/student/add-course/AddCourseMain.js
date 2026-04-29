import styles from "./AddCourseMain.module.css";
import CourseCatalog from "./CourseCatalog";
import SelectedCourses from "./SelectedCourses";

export default function AddCourseMain() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Course Catalog</h1>
          <p>Browse and enroll in available academic courses for Fall 2024 semester.</p>
        </div>

        <span className={styles.notice}>ⓘ Registration ends in 14 days</span>
      </div>

      <div className={styles.layout}>
        <CourseCatalog />
        <SelectedCourses />
      </div>
    </div>
  );
}