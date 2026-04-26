"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../layout.module.css";

import EmailIcon from "../icons/EmailIcon";
import LockIcon from "../icons/LockIcon";
import EyeIcon from "../icons/EyeIcon";
import EyeSlashIcon from "../icons/EyeSlashIcon";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Login failed. Please check your credentials.",
        );
      }

      const data = await response.json();

      // Store token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
          email: data.email,
          fullName: data.fullName,
          role: data.role,
        }),
      );

      // Redirect based on role returned from backend
      router.push(`/${data.role}`);
    } catch (error) {
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

      <form onSubmit={handleLogin}>
        {/* Email */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <EmailIcon size={18} />
          </div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Password - FIXED */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputIcon}>
            <LockIcon size={18} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <div
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon size={18} /> : <EyeSlashIcon size={18} />}
          </div>
        </div>

        <button type="submit" className={styles.loginButton}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
