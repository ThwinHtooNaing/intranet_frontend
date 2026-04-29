"use client";

import  { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../layout.module.css";

import EmailIcon from "../../icons/EmailIcon";
import LockIcon from "../../icons/LockIcon";
import UserIcon from "../../icons/UserIcon";

export default function SignupTeacherPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    teacherCode: "",
    facultyId: "",
    academicTitle: "",
  });

  const [faculties, setFaculties] = useState([]);
  const [loadingFaculties, setLoadingFaculties] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (
     !formData.username ||
     !formData.email ||
     !formData.password ||
     !formData.firstName ||
     !formData.lastName ||
     !formData.facultyId
   ) {
     alert("Please fill in all required fields");
     return;
   }

   setIsSubmitting(true);

   function generateTeacherCode() {
      const prefix = "TCH";
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `${prefix}${randomPart}`;
    }

   const payload = {
     username: formData.username,
     email: formData.email,
     password: formData.password,
     firstName: formData.firstName,
     middleName: formData.middleName || null,
     lastName: formData.lastName,
     phone: formData.phone || null,
     teacherCode: generateTeacherCode(),
     facultyId: parseInt(formData.facultyId),
     academicTitle: formData.academicTitle || null,
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
       const errorData = await response.json().catch(() => ({}));
       throw new Error(errorData.message || "Failed to create teacher account");
     }

     const result = await response.json();
     console.log("Teacher account created:", result);

     alert("Teacher account created successfully!");
     router.push("/login");
   } catch (error) {
     console.error("Error:", error);
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
          RTAL TEACHER
        </div>
      </div>

      <form onSubmit={handleSubmit}>
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

        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <LockIcon size={18} />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

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

        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <UserIcon size={18} />
          </div>
          <input
            type="text"
            name="academicTitle"
            placeholder="Academic Title (optional)"
            value={formData.academicTitle}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* Faculty Select */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <UserIcon size={18} />
          </div>
          <select
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
            className={styles.input}
            required
            style={{ paddingLeft: "52px" }}
            disabled={loadingFaculties}
          >
            <option value="">
              {loadingFaculties ? "Loading faculties..." : "Select Faculty"}
            </option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={styles.loginButton}
          style={{ marginTop: "12px" }}
        >
          {isSubmitting ? "Creating Account..." : "Create Teacher Account"}
        </button>
      </form>

      {/* Navigation Links */}
      <div style={{ marginTop: "24px", textAlign: "center", fontSize: "14px" }}>
        <div style={{ marginBottom: "8px", color: "#64748B" }}>
          Sign up as:{" "}
          <a
            href="/signup/student"
            style={{ color: "#5BA3FF", fontWeight: 600 }}
          >
            Student
          </a>
        </div>

        <div style={{ marginTop: "16px", color: "#64748B" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#5BA3FF", fontWeight: 600 }}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
