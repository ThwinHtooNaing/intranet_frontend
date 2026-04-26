import styles from "./layout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>Admin Sidebar</aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
