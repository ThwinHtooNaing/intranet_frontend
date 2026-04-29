import Sidebar from "@/components/student/Sidebar";
import Topbar from "@/components/student/Topbar";
import styles from "./layout.module.css";

export default function StudentLayout({ children }) {
  return (
    <div className={styles.studentShell}>
      <Sidebar />

      <main className={styles.studentMain}>
        <Topbar />
        <div className={styles.studentContent}>{children}</div>
      </main>
    </div>
  );
}