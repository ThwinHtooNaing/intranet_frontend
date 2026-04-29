'use client';

import styles from '@/app/admin/admin.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ onAddUser, onNewCourse }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
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
        <span className={styles.userEmail}>{user ? user.email : "Guest"}</span>
      </div>
    </header>
  );
}
