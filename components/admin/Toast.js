'use client';

import { useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';

/**
 * Toast notification that auto-dismisses.
 *
 * Props:
 *   message  – text to show
 *   onClose  – called after timeout or on click
 */
export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toast} onClick={onClose}>
      <span className={styles.toastCheck}>✓</span>
      {message}
    </div>
  );
}
