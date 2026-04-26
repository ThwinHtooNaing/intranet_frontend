'use client';

import { useState, useCallback } from 'react';
import styles from '../admin.module.css';
import Modal from '@/components/admin/Modal';
import Toast from '@/components/admin/Toast';

const initialStudents = [
  { id: 'STU-2024-001', name: 'Michael Chen',       major: 'Computer Science',   year: 'Junior',    gpa: 3.85, status: 'Active'   },
  { id: 'STU-2024-002', name: 'Sarah Johnson',       major: 'Mathematics',        year: 'Senior',    gpa: 3.92, status: 'Active'   },
  { id: 'STU-2024-003', name: 'James Martinez',      major: 'Physics',            year: 'Sophomore', gpa: 3.67, status: 'Active'   },
  { id: 'STU-2024-004', name: 'Emily Davis',         major: 'English Literature', year: 'Junior',    gpa: 3.78, status: 'Active'   },
  { id: 'STU-2024-005', name: 'David Wilson',        major: 'Economics',          year: 'Senior',    gpa: 3.54, status: 'Active'   },
  { id: 'STU-2024-006', name: 'Jessica Lee',         major: 'Chemistry',          year: 'Freshman',  gpa: 3.96, status: 'Active'   },
  { id: 'STU-2024-007', name: 'Robert Garcia',       major: 'History',            year: 'Junior',    gpa: 3.45, status: 'Inactive' },
  { id: 'STU-2024-008', name: 'Amanda Taylor',       major: 'Biology',            year: 'Senior',    gpa: 3.88, status: 'Active'   },
  { id: 'STU-2024-009', name: 'Christopher Brown',   major: 'Psychology',         year: 'Sophomore', gpa: 3.72, status: 'Active'   },
];

const emptyForm = { name: '', major: '', year: 'Freshman', gpa: '' };

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2);
}

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [toast, setToast]         = useState(null);

  const closeModal = useCallback(() => { setShowModal(false); setForm(emptyForm); }, []);
  const closeToast = useCallback(() => setToast(null), []);

  function handleAdd() {
    if (!form.name || !form.major) return;
    const nextId = `STU-2024-${String(students.length + 1).padStart(3, '0')}`;
    setStudents([
      ...students,
      { id: nextId, name: form.name, major: form.major, year: form.year, gpa: parseFloat(form.gpa) || 0, status: 'Active' },
    ]);
    setShowModal(false);
    setForm(emptyForm);
    setToast(`Student "${form.name}" added successfully`);
  }

  return (
    <main className={styles.pageContent} style={{ display: 'block' }}>
      <div className={styles.card}>

        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div className={styles.cardTitle} style={{ fontSize: '22px' }}>Students</div>
            <div className={styles.cardSubtitle} style={{ marginBottom: 0 }}>
              Manage student records and enrollment
            </div>
          </div>
          <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>
            + Add Student
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Student ID</th>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Major</th>
                <th className={styles.tableHeader}>Year</th>
                <th className={styles.tableHeader}>GPA</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr className={styles.tableRow} key={s.id}>
                  <td className={styles.tableCell} style={{ color: 'var(--text-light)', fontSize: '13px' }}>{s.id}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.submitterCell}>
                      <div className={styles.avatar}>{initials(s.name)}</div>
                      <span className={styles.reqType}>{s.name}</span>
                    </div>
                  </td>
                  <td className={styles.tableCell} style={{ color: 'var(--text-medium)' }}>{s.major}</td>
                  <td className={styles.tableCell} style={{ color: 'var(--text-medium)' }}>{s.year}</td>
                  <td className={styles.tableCell}>
                    <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{s.gpa}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={styles.statusBadge}
                      style={s.status === 'Active'
                        ? { background: 'var(--green-light)', color: 'var(--green)' }
                        : { background: 'var(--bg-page)', color: 'var(--text-light)' }}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button className={styles.moreBtn} onClick={() => setToast(`Opened: ${s.name}`)}>⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <Modal title="Add New Student" onClose={closeModal} onSubmit={handleAdd}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input className={styles.formInput} type="text" placeholder="e.g. Jane Smith"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Major</label>
            <input className={styles.formInput} type="text" placeholder="e.g. Computer Science"
              value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Year</label>
            <select className={styles.formInput} value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}>
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>GPA</label>
            <input className={styles.formInput} type="number" placeholder="e.g. 3.75" min="0" max="4" step="0.01"
              value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} />
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}
