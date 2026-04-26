"use client";

import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../layout.module.css";

import EmailIcon from "../../icons/EmailIcon";
import LockIcon from "../../icons/LockIcon";
import UserIcon from "../../icons/UserIcon";

export default function SignupStudentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    studentType: "",
    majorId: "",
    curriculumId: 1,
    studentCode: "",
    admissionYear: new Date().getFullYear(),
    currentYear: 1,
  });

  const [majors, setMajors] = useState([]);
  const [loadingMajors, setLoadingMajors] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate student code
  const generateStudentCode = () => {
    const prefix = "STU";
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${randomPart}`;
  };

  const handleSubmit = async (e) => {
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

    // Generate student code
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
      console.log("Account created successfully:", result);

      alert("Student account created successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Error creating account:", error);
      alert(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <div className={styles.encoreText}>
          WEB P
          <div className={styles.styledO}>
            <div className={styles.styledOInner}>
              <div className={styles.styledOCenter}></div>
            </div>
          </div>
          RTAL STUDENT
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <UserIcon size={18} />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Email */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <EmailIcon size={18} />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Password */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <LockIcon size={18} />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
            minLength={6}
          />
        </div>

        {/* First + Last Name */}
        <div style={{ display: "flex", gap: "12px" }}>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <div className={styles.inputIcon}>
              <UserIcon size={18} />
            </div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <div className={styles.inputIcon}>
              <UserIcon size={18} />
            </div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>


        {/* Student Type (optional) */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <UserIcon size={18} />
          </div>
          <input
            type="text"
            name="studentType"
            placeholder="Student Type (e.g. Regular)"
            value={formData.studentType}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <UserIcon size={18} />
          </div>
          <select
            name="majorId"
            value={formData.majorId}
            onChange={handleChange}
            className={styles.input}
            required
            style={{ paddingLeft: "52px" }}
            disabled={loadingMajors}
          >
            <option value="">
              {loadingMajors ? "Loading majors..." : "Select Major"}
            </option>
            {majors.map((major) => (
              <option key={major.id} value={major.id}>
                {major.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={styles.loginButton}
          style={{ marginTop: "12px" }}
        >
          Create Student Account
        </button>
      </form>

      {/* Navigation Links */}
      <div style={{ marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
        <div style={{ marginBottom: "8px", color: "#64748B" }}>
          Sign up as:{" "}
          <a
            href="/signup/teacher"
            style={{ color: "#5BA3FF", fontWeight: 600 }}
          >
            Teacher
          </a>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", gap: "16px" }}
        ></div>
        <div style={{ marginBottom: "13px", color: "#64748B" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#5BA3FF", fontWeight: 600 }}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}