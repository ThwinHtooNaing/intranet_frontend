import styles from "./layout.module.css";

export default function StudentLayout({ children }) {
  return (
    <div className={styles.studentLayout}>
      <header className={styles.header}>Student Header</header>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
