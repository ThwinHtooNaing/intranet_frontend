'use client';

import { useState, useCallback,useEffect } from 'react';
import styles from '../admin.module.css';
import Modal from '@/components/admin/Modal';
import Toast from '@/components/admin/Toast';

const emptyForm = {
  code: "",
  title: "",
  credits: "",
  description: "",
  isActive: true,
};

const coureFeeForm = {
  courseId: "",
  feePerCredit: "",
};
export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [feeForm,setFeeForm]      = useState(coureFeeForm);
  const [toast, setToast]         = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/courses/table")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  console.log(courses)

  const closeModal = useCallback(() => { setShowModal(false); setForm(emptyForm); }, []);
  const closeToast = useCallback(() => setToast(null), []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.code || !form.title || !form.credits) {
      alert("Please fill required fields");
      return;
    }


    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      // 1. Create Course
      const courseRes = await fetch(`${apiUrl}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          title: form.title,
          credits: parseInt(form.credits),
          description: form.description,
          isActive: true,
        }),
      });

      if (!courseRes.ok) throw new Error("Failed to create course");

      const course = await courseRes.json();

      // 2. Create Fee (separate table)
      await fetch(`${apiUrl}/api/courses/coursefee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          feePerCredit: parseFloat(feeForm.feePerCredit),
        }),
      });

      // 3. Update UI
      setCourses((prev) => [
        ...prev,
        {
          id: course.id,
          code: course.code,
          title: course.title,
          credits: course.credits,
          status: "Active",
        },
      ]);

      setToast(`Course "${form.code}" added successfully`);
      setShowModal(false);
      setForm(emptyForm);
      setFeeForm({ courseId: "", feePerCredit: "" });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      
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
              Courses
            </div>
            <div className={styles.cardSubtitle} style={{ marginBottom: 0 }}>
              Manage all university courses and curriculum
            </div>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={() => setShowModal(true)}
          >
            + Add Course
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Course Code</th>
                <th className={styles.tableHeader}>Title</th>
                <th className={styles.tableHeader}>Credits</th>
                <th className={styles.tableHeader}>Fee / Credit</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr className={styles.tableRow} key={c.code}>
                  {/* Code */}
                  <td className={styles.tableCell}>
                    <span
                      style={{ fontWeight: 700, color: "var(--text-dark)" }}
                    >
                      {c.code}
                    </span>
                  </td>

                  {/* Title */}
                  <td className={styles.tableCell}>
                    <div className={styles.reqType}>{c.title}</div>
                  </td>

                  {/* Credits */}
                  <td className={styles.tableCell}>{c.credits}</td>

                  {/* Fee */}
                  <td className={styles.tableCell}>{c.percredit} ฿</td>

                  {/* Status */}
                  <td className={styles.tableCell}>
                    <span
                      className={styles.statusBadge}
                      style={
                        c.isActive
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
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className={styles.tableCell}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => setToast(`Opened: ${c.title}`)}
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

      {/* Add Course Modal */}
      {showModal && (
        <Modal title="Add New Course" onClose={closeModal} onSubmit={handleAdd}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Course Code</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. CS101"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Course Name</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. Intro to Programming"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Course Fee Per Credit</label>
            <input
              className={styles.formInput}
              type="number"
              placeholder="e.g. 3000"
              value={feeForm.feePerCredit}
              onChange={(e) =>
                setFeeForm({ ...feeForm, feePerCredit: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Coures Credits</label>
            <input
              className={styles.formInput}
              type="number"
              placeholder="e.g. 3"
              min="0"
              value={form.credits}
              onChange={(e) => setForm({ ...form, credits: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. Web Project"
              min="0"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}
