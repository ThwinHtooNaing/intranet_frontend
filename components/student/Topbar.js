import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.searchBox}>
        <input placeholder="Search courses, grades, or content..." />
      </div>

      <div className={styles.userInfo}>
        <h4>Alex Johnson</h4>
        <p>Undergraduate Student</p>
      </div>
    </header>
  );
}