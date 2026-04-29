'use client';

import styles from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/teacher' },
  { icon: 'menu_book', label: 'My Courses', href: '/teacher/courses' },
  { icon: 'group', label: 'Students', href: '/teacher/students' },
  { icon: 'grade', label: 'Grades', href: '/teacher/grades' },
  { icon: 'calendar_month', label: 'Schedule', href: '/teacher/schedule' },
];

const bottomItems = [
  { icon: 'logout', label: 'Logout', href: '#' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <span className="material-symbols-outlined">go</span>
        </div>
        <div>
          <h1 className={styles.logoTitle}>UniPortal</h1>
          <p className={styles.logoSubtitle}>FACULTY MANAGEMENT</p>
        </div>
      </div>

      {/* Menu */}
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${
                isActive ? styles.active : ''
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={styles.bottomNav}>
        {bottomItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.navLink}>
            
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}