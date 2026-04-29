"use client";

import React from "react";
import styles from "./layout.module.css";
import {useRouter} from 'next/navigation';

export default function AuthLayout({ children }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      
      <div className={styles.leftArcGray}></div>
      <div className={styles.leftArcBlue}></div>

      
      <div className={styles.rightArcGray}></div>
      <div className={styles.rightArcBlue}></div>

      {/* Top navigation */}
      <div className={styles.topNav}>
        <button
          className={styles.registerBtn}
          onClick={() => router.push('/signup/student')}
        >
          Sign up
        </button>
        <button
          className={styles.signInBtn}
          onClick={() => router.push('/login')}
        >
          Log In
        </button>
      </div>

      {/* Bottom left dots */}
      <div className={styles.dots}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={styles.dot}></div>
        ))}
      </div>

      <div className={styles.box}>{children}</div>
    </div>
  );
}
