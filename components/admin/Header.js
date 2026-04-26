'use client';

import styles from '@/app/admin/admin.module.css';
import Link from 'next/link';

/**
 * Header component.
 *
 * Props (optional):
 *   onAddUser   – callback to open Add User modal
 *   onNewCourse – callback to open New Course modal
 */
export default function Header({ onAddUser, onNewCourse }) {
  return (
    <header className={styles.header}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input type="text" placeholder="Search courses, students, or IDs..." />
      </div>

      {/* Action Buttons */}
      <div className={styles.headerActions}>
        <Link href="/admin/reports" className={styles.btnOutline}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
          Reports
        </Link>

        {onAddUser ? (
          <button className={styles.btnOutline} onClick={onAddUser}>
            + Add User
          </button>
        ) : (
          <Link href="/admin/students" className={styles.btnOutline}>
            + Add User
          </Link>
        )}

        {onNewCourse ? (
          <button className={styles.btnPrimary} onClick={onNewCourse}>
            + New Course
          </button>
        ) : (
          <Link href="/admin/courses" className={styles.btnPrimary}>
            + New Course
          </Link>
        )}
      </div>
    </header>
  );
}
