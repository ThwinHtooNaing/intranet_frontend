"use client"
import styles from "./Topbar.module.css";

import { useState, useEffect } from "react";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const data = JSON.parse(item);
      setUser(data);
    }
  }, []);
  return (
    <header className={styles.topbar}>
      <div className={styles.searchBox}>
        <input placeholder="Search courses, grades, or content..." />
      </div>

      <div className={styles.userInfo}>
        <h4>{user?.fullName}</h4>
        <p>{user?.email}</p>
      </div>
    </header>
  );
}
