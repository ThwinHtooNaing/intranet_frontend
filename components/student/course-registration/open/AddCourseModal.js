import styles from "./AddCourseModal.module.css";

export default function AddCourseModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Add New Course</h2>
            <p>Create a course offering with one section.</p>
          </div>

          <button onClick={onClose}>×</button>
        </div>

        <div className={styles.body}>
          <label>Course Code</label>
          <input placeholder="e.g. CS480" />

          <label>Course Title</label>
          <input placeholder="Auto-filled" disabled />

          <label>Academic Term</label>
          <select>
            <option>Select term</option>
            <option>Spring 2026</option>
            <option>Fall 2026</option>
          </select>

          <label>Professor</label>
          <input placeholder="Auto-filled" disabled />
        </div>

        <div className={styles.footer}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.create}>Create Course</button>
        </div>
      </div>
    </div>
  );
}