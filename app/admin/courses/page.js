'use client';

import { useState, useCallback } from 'react';
import styles from '../admin.module.css';
import Modal from '@/components/admin/Modal';
import Toast from '@/components/admin/Toast';

const initialCourses = [
  { code: 'CS50',    name: 'Introduction to Computer Science',  instructor: 'Prof. Malan',    students: 320, status: 'Active'   },
  { code: 'MATH21a', name: 'Multivariable Calculus',            instructor: 'Dr. Smith',      students: 210, status: 'Active'   },
  { code: 'ENGL15a', name: 'American Literature',               instructor: 'Prof. Johnson',  students: 180, status: 'Active'   },
  { code: 'PHYS15a', name: 'Mechanics and Special Relativity',  instructor: 'Dr. Williams',   students: 145, status: 'Active'   },
  { code: 'ECON10a', name: 'Principles of Economics',           instructor: 'Prof. Davis',    students: 290, status: 'Active'   },
  { code: 'CHEM20',  name: 'Organic Chemistry',                 instructor: 'Dr. Martinez',   students: 160, status: 'Active'   },
  { code: 'HIST12b', name: 'Modern European History',           instructor: 'Prof. Anderson', students: 130, status: 'Inactive' },
  { code: 'BIO11',   name: 'Principles of Cellular Biology',    instructor: 'Dr. Thompson',   students: 175, status: 'Active'   },
];

const emptyForm = { code: '', name: '', instructor: '', students: '' };

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [toast, setToast]         = useState(null);

  const closeModal = useCallback(() => { setShowModal(false); setForm(emptyForm); }, []);
  const closeToast = useCallback(() => setToast(null), []);

  function handleAdd() {
    if (!form.code || !form.name) return;
    setCourses([
      ...courses,
      { code: form.code, name: form.name, instructor: form.instructor, students: parseInt(form.students) || 0, status: 'Active' },
    ]);
    setShowModal(false);
    setForm(emptyForm);
    setToast(`Course "${form.code}" added successfully`);
  }

  return (
    <main className={styles.pageContent} style={{ display: 'block' }}>
      <div className={styles.card}>

        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div className={styles.cardTitle} style={{ fontSize: '22px' }}>Courses</div>
            <div className={styles.cardSubtitle} style={{ marginBottom: 0 }}>
              Manage all university courses and curriculum
            </div>
          </div>
          <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>
            + Add Course
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Course Code</th>
                <th className={styles.tableHeader}>Course Name</th>
                <th className={styles.tableHeader}>Instructor</th>
                <th className={styles.tableHeader}>Students</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr className={styles.tableRow} key={c.code}>
                  <td className={styles.tableCell}>
                    <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{c.code}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.reqType}>{c.name}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.submitterCell}>
                      <div className={styles.avatar}>{c.instructor.split(' ').pop()[0]}</div>
                      {c.instructor}
                    </div>
                  </td>
                  <td className={styles.tableCell} style={{ color: 'var(--text-medium)' }}>{c.students}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={styles.statusBadge}
                      style={c.status === 'Active'
                        ? { background: 'var(--green-light)', color: 'var(--green)' }
                        : { background: 'var(--bg-page)', color: 'var(--text-light)' }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button className={styles.moreBtn} onClick={() => setToast(`Opened: ${c.name}`)}>⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      {showModal && (
        <Modal title="Add New Course" onClose={closeModal} onSubmit={handleAdd}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Course Code</label>
            <input className={styles.formInput} type="text" placeholder="e.g. CS101"
              value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Course Name</label>
            <input className={styles.formInput} type="text" placeholder="e.g. Intro to Programming"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Instructor</label>
            <input className={styles.formInput} type="text" placeholder="e.g. Dr. Johnson"
              value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Expected Students</label>
            <input className={styles.formInput} type="number" placeholder="e.g. 120" min="0"
              value={form.students} onChange={(e) => setForm({ ...form, students: e.target.value })} />
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}
