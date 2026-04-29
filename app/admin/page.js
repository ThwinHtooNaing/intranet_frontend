'use client';

import { useState, useCallback, useEffect, useMemo } from "react";
import styles from './admin.module.css';
import Modal from '@/components/admin/Modal';
import Toast from '@/components/admin/Toast';


const registrationSteps = [
  { title: 'Setup Academic Year',         status: 'Completed',   desc: 'Academic year 2023-2024 configured',              type: 'done'     },
  { title: 'Define Faculties',            status: 'Completed',   desc: '12 departments and faculties defined',             type: 'done'     },
  { title: 'Course Registration Period',  status: 'In Progress', desc: 'Set opening and closing dates for registration',  type: 'progress' },
  { title: 'Finalize Schedules',          status: 'Pending',     desc: 'Review and approve course schedules',             type: 'pending'  },
];


const quickActions = [
  { icon: '👤', label: 'Add New User',       action: 'addUser'    },
  { icon: '$',  label: 'Tuition Management', action: 'tuition'    },
  { icon: '📅', label: 'Schedule Builder',   action: 'schedule'   },
  { icon: '📊', label: 'Generate Report',    action: 'report'     },
];




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
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/enrollments/enrollment-chart")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data.length) return null;


  const maxValue = Math.max(...data.map(d => d.value));

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 260;
    const y = 70 - (d.value / maxValue) * 60; 
    return [x, y];
  });

  const toSvg = points.map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <svg viewBox="0 0 260 80" className={styles.trendChart}>
      
      {/* Line */}
      <polyline
        points={toSvg}
        fill="none"
        stroke="#e05c2a"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Labels */}
      {data.map((d, i) => (
        <text
          key={d.month}
          x={(i / (data.length - 1)) * 240 + 10}
          y="76"
          fontSize="9"
          fill="#aaa"
        >
          {d.month}
        </text>
      ))}

    </svg>
  );
}



export default function AdminDashboardPage() {
  const [modal, setModal]     = useState(null); 
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'Student' });

 const [audits, setAudits] = useState([]);
 const [toast, setToast] = useState(null);
 const closeToast = useCallback(() => setToast(null), []);

 useEffect(() => {
   fetch("http://localhost:8080/api/admins/audits")
     .then((res) => res.json())
     .then((data) => setAudits(data))
     .catch((err) => console.error(err));
 }, []);

 const initialRequests = useMemo(() => {
   return audits.slice(0, 5).map((a) => {
     const formattedDate = new Date(a.date).toLocaleDateString("en-US", {
       month: "short",
       day: "2-digit",
       year: "numeric",
     });

     let status = "Review";
     let statusClass = styles.statusReview;

     if (a.status === "Critical") {
       status = "Urgent";
       statusClass = styles.statusUrgent;
     } else if (a.status === "Completed") {
       status = "Approved";
       statusClass = styles.statusApproved;
     }

     return {
       type: a.action.replaceAll("_", " "),
       subtype: a.entity,
       submitter: a.fullName,
       initials: a.fullName
         .split(" ")
         .map((n) => n[0])
         .join(""),
       date: formattedDate,
       status,
       statusClass,
     };
   });
 }, [audits]);

  const [stats, setStats] = useState([
    {
      label: "Total Students",
      value: "0",
      meta: "",
      icon: "🎓",
      metaClass: styles.statMetaGreen,
    },
    {
      label: "Active Faculty",
      value: "0",
      meta: "",
      icon: "👥",
      metaClass: styles.statMetaGreen,
    },
    {
      label: "Active Courses",
      value: "0",
      meta: "",
      icon: "📋",
      metaClass: styles.statMetaOrange,
    },
  ]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [students, faculty, courses, teachers] = await Promise.all([
          fetch("http://localhost:8080/api/admins/student-counts").then((res) =>
            res.json(),
          ),
          fetch("http://localhost:8080/api/admins/faculty-counts").then((res) =>
            res.json(),
          ),
          fetch("http://localhost:8080/api/admins/course-active-counts").then(
            (res) => res.json(),
          ),
          fetch("http://localhost:8080/api/admins/teacher-active-counts").then(
            (res) => res.json(),
          ),
        ]);

        setStats([
          {
            label: "Total Students",
            value: students.toLocaleString(),
            meta: "",
            icon: "🎓",
            metaClass: styles.statMetaGreen,
          },
          {
            label: "Active Faculty",
            value: faculty.toLocaleString(),
            meta: "",
            icon: "👥",
            metaClass: styles.statMetaGreen,
          },
          {
            label: "Active Courses",
            value: courses.toLocaleString(),
            meta: "",
            icon: "📋",
            metaClass: styles.statMetaOrange,
          },
          {
            label: "Active Teachers",
            value: teachers.toLocaleString(),
            meta: "",
            icon: "👨‍🏫",
            metaClass: styles.statMetaGreen,
          },
        ]);
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    }

    fetchStats();
  }, []);

  const [systemOverview, setSystemOverview] = useState([]);

  useEffect(() => {
    async function loadOverview() {
      const res = await fetch(
        "http://localhost:8080/api/admins/system-overview",
      );
      const data = await res.json();

      const studentPct = Math.round((data.students / 200) * 100); // temp max
      const teacherPct = Math.round(
        (data.teachersActive / data.teachersTotal) * 100,
      );

      setSystemOverview([
        {
          label: "Students Enrolled",
          value: data.students.toLocaleString(),
          pct: studentPct,
        },
        {
          label: "Active Teachers",
          value: data.teachersActive.toLocaleString(),
          pct: teacherPct,
        },

      ]);
    }

    loadOverview();
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

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

  console.log(initialRequests)

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
              <span>{s.highlight}</span>{" "}
              {s.meta.replace(s.highlight, "").trim()}
            </div>
          </div>
        ))}
      </div>

      {/* ── Left Column ── */}
      <div className={styles.leftColumn}>
        {/* Course Registration */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Open Course Registration</div>
          <div className={styles.cardSubtitle}>
            Complete these steps to activate the student portal
          </div>

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
            <button
              className={styles.btnPrimary}
              onClick={() => setModal("activatePortal")}
            >
              Activate Portal
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => setToast("Settings saved")}
            >
              Review Settings
            </button>
          </div>
        </div>

        {/* Pending Requests */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Pending Requests</div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
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
                  <tr
                    className={styles.tableRow}
                    key={req.type + req.date + req.submitter}
                  >
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
                    <td
                      className={styles.tableCell}
                      style={{
                        color: "var(--text-light)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {req.date}
                    </td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.statusBadge} ${req.statusClass}`}
                      >
                        {req.status}
                      </span>
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
                <div
                  className={styles.progressFill}
                  style={{ width: `${item.pct}%` }}
                />
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
          <div className={styles.trendLabel}>Fall Semester 2026</div>
          <EnrollmentChart />
        </div>
      </div>

      {/* ── Add User Modal ── */}
      {modal === "addUser" && (
        <Modal
          title="Add New User"
          onClose={closeModal}
          onSubmit={handleAddUser}
        >
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. Jane Smith"
              value={userForm.name}
              onChange={(e) =>
                setUserForm({ ...userForm, name: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              className={styles.formInput}
              type="email"
              placeholder="e.g. jane@university.edu"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Role</label>
            <select
              className={styles.formInput}
              value={userForm.role}
              onChange={(e) =>
                setUserForm({ ...userForm, role: e.target.value })
              }
            >
              <option>Student</option>
              <option>Teacher</option>
              <option>Admin</option>
            </select>
          </div>
        </Modal>
      )}

      {/* ── Activate Portal Confirmation ── */}
      {modal === "activatePortal" && (
        <Modal
          title="Activate Student Portal"
          onClose={closeModal}
          onSubmit={handleActivatePortal}
        >
          <p
            style={{ fontSize: "14px", color: "var(--text-medium)", margin: 0 }}
          >
            This will open the registration period for all students. Are you
            sure you want to activate the portal?
          </p>
        </Modal>
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}
