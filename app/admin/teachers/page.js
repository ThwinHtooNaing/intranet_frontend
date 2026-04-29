'use client';

import { useState,useEffect, useCallback } from 'react';
import styles from '../admin.module.css';
import Modal from '@/components/admin/Modal';
import Toast from '@/components/admin/Toast';


const formData = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  academicTitle: "",
  facultyId: "",
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(formData);
  const [toast, setToast]         = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [loadingFaculties, setLoadingFaculties] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusSubmitting, setStatusSubmitting] = useState(false);
  const [newStatus, setNewStatus] = useState("LOCKED");

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const response = await fetch(`${apiUrl}/api/teachers/faculties`);

        if (!response.ok) throw new Error("Failed to fetch faculties");

        const data = await response.json();
        setFaculties(data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setFaculties([
          { id: 1, name: "Faculty of General Education" },
          { id: 2, name: "Faculty of Science" },
        ]);
      } finally {
        setLoadingFaculties(false);
      }
    };

    fetchFaculties();
  }, []);

  const closeModal = useCallback(() => { setShowModal(false); setForm(formData); }, []);
  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch(
          "http://localhost:8080/api/admins/teacher/table",
        );
        const data = await res.json();

        // console.log(data);

        const mapped = data.map((t) => ({
          id: t.teacherCode,
          userId: t.userId,
          name: t.fullName,
          department: t.facultyName,
          courses: t.courseCount,
          status: t.status,
          title: t.academicTitle,
          email: t.email,
        }));

        setTeachers(mapped);
      } catch (err) {
        console.error("Failed to fetch teachers", err);
      }
    }

    fetchTeachers();
  }, []);

 const handleAdd = async (e) => {
   e.preventDefault();

   if (
     !form.username ||
     !form.email ||
     !form.password ||
     !form.firstName ||
     !form.lastName ||
     !form.facultyId
   ) {
     alert("Please fill in all required fields");
     return;
   }

   console.log(form);
   function generateTeacherCode() {
     const prefix = "TCH";
     const randomPart = Math.random()
       .toString(36)
       .substring(2, 8)
       .toUpperCase();
     return `${prefix}${randomPart}`;
   }


   const payload = {
     username: form.username,
     email: form.email,
     password: form.password,
     firstName: form.firstName,
     lastName: form.lastName,
     academicTitle: form.academicTitle || null,
     teacherCode: generateTeacherCode(),
     facultyId: parseInt(form.facultyId),
   };

   try {
     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

     const response = await fetch(`${apiUrl}/api/teachers/account`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(payload),
     });

     if (!response.ok) {
       const err = await response.json().catch(() => ({}));
       throw new Error(err.message || "Failed to create teacher");
     }

     const result = await response.json();

     setTeachers((prev) => [
       ...prev,
       {
         id: result.id || payload.teacherCode,
         name: `${formData.firstName} ${formData.lastName}`,
         department:
           faculties.find((f) => f.id == formData.facultyId)?.name || "",
         status: "Active",
       },
     ]);

     setToast(`Teacher "${formData.firstName}" added`);
     setShowModal(false);
     setForm(formData);
   } catch (error) {
     console.error(error);
     alert(error.message);
   } finally {
   }
 };

 const handleLockAccount = async () => {
   if (!selectedTeacher) return;

   setStatusSubmitting(true);

   try {
     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

     const response = await fetch(
       `${apiUrl}/api/admins/users/${selectedTeacher.userId}/status`,
       {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           status: newStatus,
         }),
       },
     );

     if (!response.ok) {
       throw new Error("Failed to update account");
     }

     setTeachers((prev) =>
       prev.map((t) =>
         t.id === selectedTeacher.id ? { ...t, status: newStatus } : t,
       ),
     );

     setToast(`Account updated: ${selectedTeacher.name}`);
     setShowStatusModal(false);
     setSelectedTeacher(null);
   } catch (error) {
     console.error(error);
     alert(error.message || "Failed to update account");
   } finally {
     setStatusSubmitting(false);
   }
 };

  return (
    <main className={styles.pageContent} style={{ display: "block" }}>
      <div className={styles.card}>
        {/* Page Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <div className={styles.cardTitle} style={{ fontSize: "22px" }}>
              Teachers
            </div>
            <div className={styles.cardSubtitle} style={{ marginBottom: 0 }}>
              Manage faculty members and teaching assignments
            </div>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={() => setShowModal(true)}
          >
            + Add Teacher
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
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
                  {/* Teacher ID */}
                  <td
                    className={styles.tableCell}
                    style={{ color: "var(--text-light)", fontSize: "13px" }}
                  >
                    {t.id}
                  </td>

                  {/* Name */}
                  <td className={styles.tableCell}>
                    <div className={styles.submitterCell}>
                      <span className={styles.reqType}>{t.name}</span>
                    </div>
                  </td>

                  {/* Department */}
                  <td
                    className={styles.tableCell}
                    style={{ color: "var(--text-medium)" }}
                  >
                    {t.department}
                  </td>

                  {/* Courses */}
                  <td className={styles.tableCell}>
                    <span
                      style={{ fontWeight: 600, color: "var(--text-dark)" }}
                    >
                      {t.courses}
                    </span>
                  </td>

                  {/* Status */}
                  <td className={styles.tableCell}>
                    <span
                      className={styles.statusBadge}
                      style={
                        t.status === "ACTIVE"
                          ? {
                              background: "var(--green-light)",
                              color: "var(--green)",
                            }
                          : {
                              background: "var(--bg-page)",
                              color: "var(--text-light)",
                            }
                      }
                    >
                      {t.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className={styles.tableCell}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => setToast(`Opened: ${t.name}`)}
                    >
                      ⋯
                    </button>
                  </td>
                  <td className={styles.tableCell}>
                    <button
                      className={styles.lockBtn}
                      onClick={() => {
                        setSelectedTeacher(t);
                        setNewStatus(t.status);
                        setShowStatusModal(true);
                      }}
                    >
                      Lock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showModal && (
        <Modal
          title="Add New Teacher"
          onClose={closeModal}
          onSubmit={handleAdd}
        >
          {/* Username */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <input
              className={styles.formInput}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              className={styles.formInput}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              className={styles.formInput}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* First + Last Name */}
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              className={styles.formInput}
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              className={styles.formInput}
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>

          {/* Academic Title */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Academic Title</label>
            <input
              className={styles.formInput}
              value={form.academicTitle}
              onChange={(e) =>
                setForm({ ...form, academicTitle: e.target.value })
              }
            />
          </div>

          {/* Faculty */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Faculty</label>
            <select
              className={styles.formInput}
              value={form.facultyId}
              onChange={(e) => setForm({ ...form, facultyId: e.target.value })}
            >
              <option value="">Select Faculty</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </Modal>
      )}

      {showStatusModal && selectedTeacher && (
        <Modal
          title="Update Teacher Account"
          onClose={() => {
            setShowStatusModal(false);
            setSelectedTeacher(null);
          }}
          onSubmit={handleLockAccount}
        >
          <p style={{ marginBottom: "16px", color: "var(--text-medium)" }}>
            Update status for <strong>{selectedTeacher.name}</strong>
          </p>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>New Status</label>
            <select
              className={styles.formInput}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="LOCKED">LOCKED</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          {statusSubmitting && (
            <p style={{ color: "var(--text-light)", fontSize: "13px" }}>
              Updating status...
            </p>
          )}
        </Modal>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}
