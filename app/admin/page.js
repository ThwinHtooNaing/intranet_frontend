'use client';

import { useState, useCallback } from 'react';
import styles from './admin.module.css';
import Modal from '@/components/admin/Modal';
import Toast from '@/components/admin/Toast';

// ── Static Data ───────────────────────────────────────────────────────────────

const stats = [
  {
    label: 'Total Students',
    value: '14,285',
    meta: '+2.4% vs last semester',
    highlight: '+2.4%',
    icon: '🎓',
    metaClass: styles.statMetaGreen,
  },
  {
    label: 'Active Faculty',
    value: '1,142',
    meta: '+12 new hires this month',
    highlight: '+12',
    icon: '👥',
    metaClass: styles.statMetaGreen,
  },
  {
    label: 'Active Courses',
    value: '856',
    meta: '45 pending approval',
    highlight: '45',
    icon: '📋',
    metaClass: styles.statMetaOrange,
  },
];

const registrationSteps = [
  { title: 'Setup Academic Year',         status: 'Completed',   desc: 'Academic year 2023-2024 configured',              type: 'done'     },
  { title: 'Define Faculties',            status: 'Completed',   desc: '12 departments and faculties defined',             type: 'done'     },
  { title: 'Course Registration Period',  status: 'In Progress', desc: 'Set opening and closing dates for registration',  type: 'progress' },
  { title: 'Finalize Schedules',          status: 'Pending',     desc: 'Review and approve course schedules',             type: 'pending'  },
];

const systemOverview = [
  { label: 'Students Enrolled',  value: '14,285', pct: 88 },
  { label: 'Active Teachers',    value: '1,142',  pct: 72 },
  { label: 'Course Completion',  value: '92%',    pct: 92 },
];

const quickActions = [
  { icon: '👤', label: 'Add New User',       action: 'addUser'    },
  { icon: '$',  label: 'Tuition Management', action: 'tuition'    },
  { icon: '📅', label: 'Schedule Builder',   action: 'schedule'   },
  { icon: '📊', label: 'Generate Report',    action: 'report'     },
];

const initialRequests = [
  { type: 'New Course Syllabus', subtype: 'CS50 Introduction to Computer Science', submitter: 'Prof. Malan',   initials: 'PM', date: 'Oct 24, 2023', status: 'Review',   statusClass: styles.statusReview   },
  { type: 'Schedule Change',     subtype: 'MATH21a Multivariable Calculus',        submitter: 'Dr. Smith',     initials: 'DS', date: 'Oct 23, 2023', status: 'Review',   statusClass: styles.statusReview   },
  { type: 'Grade Appeal',        subtype: 'Student ID: 8472910',                   submitter: 'Admin Dept',    initials: 'AD', date: 'Oct 22, 2023', status: 'Urgent',   statusClass: styles.statusUrgent   },
  { type: 'Facility Request',    subtype: 'Science Center Hall B',                 submitter: 'Prof. Johnson', initials: 'PJ', date: 'Oct 21, 2023', status: 'Approved', statusClass: styles.statusApproved },
];

// ── Small helper components ───────────────────────────────────────────────────

function StepIcon({ type, index }) {
  if (type === 'done') return <span className={`${styles.stepIcon} ${styles.stepIconDone}`}>✓</span>;
  if (type === 'progress') return <span className={`${styles.stepIcon} ${styles.stepIconProgress}`}>{index + 1}</span>;
  return <span className={`${styles.stepIcon} ${styles.stepIconPending}`}>{index + 1}</span>;
}

function StepBadge({ type, label }) {
  const cls = type === 'done' ? styles.badgeDone : type === 'progress' ? styles.badgeProgress : styles.badgePending;
  return <span className={`${styles.badge} ${cls}`}>{label}</span>;
}

function EnrollmentChart() {
  const points = [[0, 65], [20, 50], [40, 28], [60, 32], [80, 38], [100, 35]];
  const toSvg = points.map(([x, y]) => `${(x / 100) * 260},${y}`).join(' ');
  return (
    <svg viewBox="0 0 260 80" className={styles.trendChart} xmlns="http://www.w3.org/2000/svg">
      <polyline points={toSvg} fill="none" stroke="#e05c2a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {['Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
        <text key={m} x={(i / 4) * 240 + 10} y="76" fontSize="9" fill="#aaa">{m}</text>
      ))}
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [modal, setModal]     = useState(null); // null | 'addUser' | 'activatePortal'
  const [toast, setToast]     = useState(null); // null | string
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'Student' });

  const closeModal = useCallback(() => setModal(null), []);
  const closeToast = useCallback(() => setToast(null), []);

  function handleQuickAction(action) {
    if (action === 'addUser') {
      setModal('addUser');
    } else if (action === 'report') {
      setToast('Report generated successfully');
    } else if (action === 'tuition') {
      setToast('Opening Tuition Management...');
    } else if (action === 'schedule') {
      setToast('Opening Schedule Builder...');
    }
  }

  function handleAddUser() {
    if (!userForm.name || !userForm.email) return;
    setModal(null);
    setToast(`User "${userForm.name}" added successfully`);
    setUserForm({ name: '', email: '', role: 'Student' });
  }

  function handleActivatePortal() {
    setModal(null);
    setToast('Student portal activated successfully');
  }

  return (
    <main className={styles.pageContent}>

      {/* ── Stat Cards ── */}
      <div className={styles.statCardsRow}>
        {stats.map((s) => (
          <div className={styles.statCard} key={s.label}>
            <div className={styles.statCardTop}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statIconBox}>{s.icon}</span>
            </div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={`${styles.statMeta} ${s.metaClass}`}>
              <span>{s.highlight}</span>{' '}
              {s.meta.replace(s.highlight, '').trim()}
            </div>
          </div>
        ))}
      </div>

      {/* ── Left Column ── */}
      <div className={styles.leftColumn}>

        {/* Course Registration */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Open Course Registration</div>
          <div className={styles.cardSubtitle}>Complete these steps to activate the student portal</div>

          <div className={styles.stepsList}>
            {registrationSteps.map((step, i) => (
              <div className={styles.step} key={step.title}>
                <StepIcon type={step.type} index={i} />
                <div className={styles.stepBody}>
                  <div className={styles.stepTitle}>
                    {step.title}
                    <StepBadge type={step.type} label={step.status} />
                  </div>
                  <div className={styles.stepDesc}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cardActions}>
            <button className={styles.btnPrimary} onClick={() => setModal('activatePortal')}>
              Activate Portal
            </button>
            <button className={styles.btnSecondary} onClick={() => setToast('Settings saved')}>
              Review Settings
            </button>
          </div>
        </div>

        {/* Pending Requests */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Pending Requests</div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Request Type</th>
                  <th className={styles.tableHeader}>Submitted By</th>
                  <th className={styles.tableHeader}>Date</th>
                  <th className={styles.tableHeader}>Status</th>
                  <th className={styles.tableHeader}></th>
                </tr>
              </thead>
              <tbody>
                {initialRequests.map((req) => (
                  <tr className={styles.tableRow} key={req.type + req.date}>
                    <td className={styles.tableCell}>
                      <div className={styles.reqType}>{req.type}</div>
                      <div className={styles.reqSubtype}>{req.subtype}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.submitterCell}>
                        <div className={styles.avatar}>{req.initials}</div>
                        {req.submitter}
                      </div>
                    </td>
                    <td className={styles.tableCell} style={{ color: 'var(--text-light)', whiteSpace: 'nowrap' }}>
                      {req.date}
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${req.statusClass}`}>{req.status}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <button
                        className={styles.moreBtn}
                        onClick={() => setToast(`Opened: ${req.type}`)}
                      >
                        ⋯
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className={styles.rightPanel}>

        {/* System Overview */}
        <div className={styles.panelCard}>
          <div className={styles.panelTitle}>System Overview</div>
          {systemOverview.map((item) => (
            <div key={item.label}>
              <div className={styles.overviewRow}>
                <span className={styles.overviewLabel}>{item.label}</span>
                <span className={styles.overviewValue}>{item.value}</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={styles.panelCard}>
          <div className={styles.panelTitle}>Quick Actions</div>
          <div className={styles.quickActions}>
            {quickActions.map((qa) => (
              <div
                className={styles.quickAction}
                key={qa.label}
                onClick={() => handleQuickAction(qa.action)}
              >
                <span className={styles.qaIcon}>{qa.icon}</span>
                {qa.label}
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Trend */}
        <div className={styles.panelCard}>
          <div className={styles.panelTitle}>Enrollment Trends</div>
          <div className={styles.trendLabel}>Fall Semester 2023</div>
          <EnrollmentChart />
        </div>
      </div>

      {/* ── Add User Modal ── */}
      {modal === 'addUser' && (
        <Modal title="Add New User" onClose={closeModal} onSubmit={handleAddUser}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. Jane Smith"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              className={styles.formInput}
              type="email"
              placeholder="e.g. jane@university.edu"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Role</label>
            <select
              className={styles.formInput}
              value={userForm.role}
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            >
              <option>Student</option>
              <option>Teacher</option>
              <option>Admin</option>
            </select>
          </div>
        </Modal>
      )}

      {/* ── Activate Portal Confirmation ── */}
      {modal === 'activatePortal' && (
        <Modal title="Activate Student Portal" onClose={closeModal} onSubmit={handleActivatePortal}>
          <p style={{ fontSize: '14px', color: 'var(--text-medium)', margin: 0 }}>
            This will open the registration period for all students. Are you sure you want to activate the portal?
          </p>
        </Modal>
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onClose={closeToast} />}

    </main>
  );
}
