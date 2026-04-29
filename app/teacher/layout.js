
import styles from "./layout.module.css";
import Sidebar from "@/components/teacher/Sidebar";
import Topbar from "@/components/teacher/Topbar";


export default function TeacherLayout({ children }) {
  return (
    <div className={styles.teacherLayout}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Topbar />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}