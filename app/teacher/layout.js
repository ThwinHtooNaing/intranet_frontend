import styles from "./layout.module.css";

export default function TeacherLayout({ children }) {
  return (
    <div className={styles.teacherLayout}>
      <nav className={styles.navbar}>Teacher Navbar</nav>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
