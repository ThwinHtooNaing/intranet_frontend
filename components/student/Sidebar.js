"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const menuItems = [
  { icon: "", label: "Dashboard", href: "/student" },
  { icon: "", label: "My Courses", href: "/student/courses" },
  { icon: "", label: "Grades/GPA", href: "/student/grades" },
  { icon: "", label: "Schedule", href: "/student/schedule" },
  { icon: "", label: "Course Registration", href: "/student/course-registration" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.logoBox}>
          <div className={styles.logoIcon}>
            <span className="material-icons">s</span>
          </div>

          <div>
            <h2>UniPortal</h2>
            <p>Academic Management</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
              >
                <span className="material-icons">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <Link href="/" className={styles.logout}>
        <span className="material-icons"></span>
        <span>Logout</span>
      </Link>
    </aside>
  );
}