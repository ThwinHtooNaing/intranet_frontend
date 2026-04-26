'use client';

import { useState, useCallback } from 'react';
import styles from '../admin.module.css';
import Modal from '@/components/admin/Modal';
import Toast from '@/components/admin/Toast';

const initialTeachers = [
  { id: 'TCH-2024-001', name: 'Dr. Robert Williams',     department: 'Computer Science',   courses: 5, status: 'Active'   },
  { id: 'TCH-2024-002', name: 'Prof. Jennifer Martinez', department: 'Mathematics',        courses: 4, status: 'Active'   },
  { id: 'TCH-2024-003', name: 'Dr. Thomas Anderson',     department: 'Physics',            courses: 3, status: 'Active'   },
  { id: 'TCH-2024-004', name: 'Dr. Patricia Thompson',   department: 'English Literature', courses: 6, status: 'Active'   },
  { id: 'TCH-2024-005', name: 'Prof. Michael Davis',     department: 'Economics',          courses: 4, status: 'Active'   },
  { id: 'TCH-2024-006', name: 'Dr. Susan Miller',        department: 'Chemistry',          courses: 5, status: 'Active'   },
  { id: 'TCH-2024-007', name: 'Prof. James Wilson',      department: 'History',            courses: 3, status: 'Inactive' },
  { id: 'TCH-2024-008', name: 'Dr. Linda Garcia',        department: 'Biology',            courses: 4, status: 'Active'   },
];

const emptyForm = { name: '', department: '', courses: '' };

function initials(name) {
  const parts = name.replace(/^(Dr\.|Prof\.)\s/, '').split(' ');
  return parts.map((w) => w[0]).join('').slice(0, 2);
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [toast, setToast]         = useState(null);

  const closeModal = useCallback(() => { setShowModal(false); setForm(emptyForm); }, []);
  const closeToast = useCallback(() => setToast(null), []);

  function handleAdd() {
    if (!form.name || !form.department) return;
    const nextId = `TCH-2024-${String(teachers.length + 1).padStart(3, '0')}`;
    setTeachers([
      ...teachers,
      { id: nextId, name: form.name, department: form.department, courses: parseInt(form.courses) || 0, status: 'Active' },
    ]);
    setShowModal(false);
    setForm(emptyForm);
    setToast(`Teacher "${form.name}" added successfully`);
  }

  return (
    <main className={styles.pageContent} style={{ display: 'block' }}>
      <div className={styles.card}>

        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div className={styles.cardTitle} style={{ fontSize: '22px' }}>Teachers</div>
            <div className={styles.cardSubtitle} style={{ marginBottom: 0 }}>
              Manage faculty members and teaching assignments
            </div>
          </div>
          <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>
            + Add Teacher
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Teacher ID</th>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Department</th>
                <th className={styles.tableHeader}>Courses Assigned</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr className={styles.tableRow} key={t.id}>
                  <td className={styles.tableCell} style={{ color: 'var(--text-light)', fontSize: '13px' }}>{t.id}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.submitterCell}>
                      <div className={styles.avatar}>{initials(t.name)}</div>
                      <span className={styles.reqType}>{t.name}</span>
                    </div>
                  </td>
                  <td className={styles.tableCell} style={{ color: 'var(--text-medium)' }}>{t.department}</td>
                  <td className={styles.tableCell}>
                    <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{t.courses}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={styles.statusBadge}
                      style={t.status === 'Active'
                        ? { background: 'var(--green-light)', color: 'var(--green)' }
                        : { background: 'var(--bg-page)', color: 'var(--text-light)' }}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button className={styles.moreBtn} onClick={() => setToast(`Opened: ${t.name}`)}>⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showModal && (
        <Modal title="Add New Teacher" onClose={closeModal} onSubmit={handleAdd}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input className={styles.formInput} type="text" placeholder="e.g. Dr. Jane Smith"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Department</label>
            <input className={styles.formInput} type="text" placeholder="e.g. Computer Science"
              value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Courses Assigned</label>
            <input className={styles.formInput} type="number" placeholder="e.g. 3" min="0"
              value={form.courses} onChange={(e) => setForm({ ...form, courses: e.target.value })} />
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}
