"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../layout.module.css";

import EmailIcon from "../../icons/EmailIcon";
import LockIcon from "../../icons/LockIcon";
import UserIcon from "../../icons/UserIcon";

export default function SignupAdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || 
        !formData.firstName || !formData.lastName || !formData.adminCode) {
      alert("Please fill in all required fields");
      return;
    }

    // Simulate API call
    console.log("Creating admin account:", formData);
    alert("Admin account created successfully! (Demo)");

    // Redirect to login or admin dashboard
    router.push("/login");
  };

  return (
    <div className={styles.form}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.encoreText}>
          WEB P
          <div className={styles.styledO}>
            <div className={styles.styledOInner}>
              <div className={styles.styledOCenter}></div>
            </div>
          </div>
          RTAL
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
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
            minLength={6}
          />
        </div>

        {/* First Name + Last Name (side by side) */}
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

        {/* Middle Name (optional) */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <UserIcon size={18} />
          </div>
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name (optional)"
            value={formData.middleName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* Phone (optional) */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (optional)"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>


        <button type="submit" className={styles.loginButton} style={{ marginTop: "12px" }}>
          Create Admin Account
        </button>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <span style={{ color: "#64748B", fontSize: "14px" }}>
          Already have an account?{" "}
        </span>
        <a 
          href="/login" 
          style={{ color: "#5BA3FF", fontWeight: 600, textDecoration: "none" }}
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
