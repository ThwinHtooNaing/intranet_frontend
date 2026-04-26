'use client';

import styles from '@/app/admin/admin.module.css';

/**
 * Reusable Modal component.
 *
 * Props:
 *   title   – modal heading
 *   onClose – called when user clicks Cancel or the backdrop
 *   onSubmit – called when user submits the form
 *   children – form fields
 */
export default function Modal({ title, onClose, onSubmit, children }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalBox}
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          {children}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary} onClick={onSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}
