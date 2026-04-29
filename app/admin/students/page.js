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
  studentType: "",
  majorId: "",
};

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(formData);
  const [toast, setToast]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [majors, setMajors] = useState([]);
  const [loadingMajors, setLoadingMajors] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusSubmitting, setStatusSubmitting] = useState(false);
  const [newStatus, setNewStatus] = useState("LOCKED");
  
    // Fetch majors
    useEffect(() => {
      const fetchMajors = async () => {
        try {
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
          const response = await fetch(`${apiUrl}/api/users/majors`);
  
          if (!response.ok) throw new Error("Failed to fetch majors");
  
          const data = await response.json();
          setMajors(data);
        } catch (error) {
          console.error("Error fetching majors:", error);
          setMajors([
            { id: 1, name: "Computer Science" },
            { id: 2, name: "Business Administration" },
            { id: 3, name: "Engineering" },
          ]);
        } finally {
          setLoadingMajors(false);
        }
      };
  
      fetchMajors();
    }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const generateStudentCode = () => {
    const prefix = "STU";
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${randomPart}`;
  };
  

  const closeModal = useCallback(() => { setShowModal(false); setForm(emptyForm); }, []);
  const closeToast = useCallback(() => setToast(null), []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.majorId
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const studentCode = generateStudentCode();

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      middleName: formData.middleName || null,
      lastName: formData.lastName,
      phone: formData.phone || null,
      studentCode: studentCode,
      studentType: formData.studentType || null,
      majorId: parseInt(formData.majorId),
      curriculumId: formData.curriculumId,
      admissionYear: formData.admissionYear,
      currentYear: formData.currentYear,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const response = await fetch(`${apiUrl}/api/students/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create account");
      }

      const result = await response.json();

      // ✅ Update UI list (optional)
      setStudents((prev) => [
        ...prev,
        {
          id: result.id || studentCode,
          name: `${formData.firstName} ${formData.lastName}`,
          major: majors.find((m) => m.id == formData.majorId)?.name || "",
          status: "Active",
        },
      ]);

      setToast(`Student "${formData.firstName} ${formData.lastName}" added`);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating account:", error);
      alert(error.message || "Failed to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLockAccount = async () => {
    if (!selectedStudent) return;

    setStatusSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const response = await fetch(
        `${apiUrl}/api/admins/users/${selectedStudent.userId || selectedStudent.id}/status`,
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
        throw new Error("Failed to lock account");
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, status: newStatus }
            : student,
        ),
      );

      setToast(`Account ${newStatus}: ${selectedStudent.fullName}`);
      setShowStatusModal(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to lock account");
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
              Students
            </div>
            <div className={styles.cardSubtitle} style={{ marginBottom: 0 }}>
              Manage student records and enrollment
            </div>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={() => setShowModal(true)}
          >
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
                <th className={styles.tableHeader}>Type</th>
                <th className={styles.tableHeader}>Major</th>
                <th className={styles.tableHeader}>Email</th>
                <th className={styles.tableHeader}>Admisson Year</th>
                <th className={styles.tableHeader}>Current Year</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr className={styles.tableRow} key={s.id}>
                  {/* Student Code */}
                  <td
                    className={styles.tableCell}
                    style={{ color: "var(--text-light)", fontSize: "13px" }}
                  >
                    {s.studentCode}
                  </td>

                  {/* Name */}
                  <td className={styles.tableCell}>
                    <div className={styles.submitterCell}>
                      <span className={styles.reqType}>{s.fullName}</span>
                    </div>
                  </td>

                  <td className={styles.tableCell}>
                    <div className={styles.submitterCell}>
                      <span className={styles.reqType}>{s.studentType}</span>
                    </div>
                  </td>

                  {/* Major */}
                  <td
                    className={styles.tableCell}
                    style={{ color: "var(--text-medium)" }}
                  >
                    {s.majorName}
                  </td>

                  <td
                    className={styles.tableCell}
                    style={{ color: "var(--text-medium)" }}
                  >
                    {s.email}
                  </td>

                  <td
                    className={styles.tableCell}
                    style={{ color: "var(--text-medium)" }}
                  >
                    {s.admissionYear}
                  </td>

                  {/* Year */}
                  <td
                    className={styles.tableCell}
                    style={{ color: "var(--text-medium)" }}
                  >
                    Year {s.currentYear}
                  </td>

                  {/* Status */}
                  <td className={styles.tableCell}>
                    <span
                      className={styles.statusBadge}
                      style={
                        s.status === "ACTIVE"
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
                      {s.status}
                    </span>
                  </td>

                  <td className={styles.tableCell}>
                    <button
                      className={styles.lockBtn}
                      onClick={() => {
                        setSelectedStudent(s);
                        setNewStatus(s.status); // auto-select current
                        setShowStatusModal(true);
                      }}
                    >
                      Lock
                    </button>
                  </td>

                  {/* Action */}
                  <td className={styles.tableCell}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => setToast(`Opened: ${s.fullName}`)}
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

      {/* Add Student Modal */}
      {showModal && (
        <Modal
          title="Add New Student"
          onClose={closeModal}
          onSubmit={handleAdd}
        >
          {/* Username */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <input
              className={styles.formInput}
              type="text"
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

          {/* First Name */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>First Name</label>
            <input
              className={styles.formInput}
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>

          {/* Last Name */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Last Name</label>
            <input
              className={styles.formInput}
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>

          {/* Student Type */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Student Type</label>
            <input
              className={styles.formInput}
              type="text"
              value={form.studentType}
              onChange={(e) =>
                setForm({ ...form, studentType: e.target.value })
              }
            />
          </div>

          {/* Major */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Major</label>
            <select
              className={styles.formInput}
              value={form.majorId}
              onChange={(e) => setForm({ ...form, majorId: e.target.value })}
            >
              <option value="">Select Major</option>
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>
        </Modal>
      )}
      {showStatusModal && selectedStudent && (
        <Modal
          title="Lock Student Account"
          onClose={() => {
            setShowStatusModal(false);
            setSelectedStudent(null);
          }}
          onSubmit={handleLockAccount}
        >
          <p style={{ marginBottom: "16px", color: "var(--text-medium)" }}>
            Are you sure you want to lock the account for{" "}
            <strong>{selectedStudent.fullName}</strong>?
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
