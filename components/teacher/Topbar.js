'use client';

import styles from './Topbar.module.css';
import {useState,useEffect} from 'react';

export default function Topbar() {

  const [user,setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.searchContainer}>
        
        <input 
          type="text" 
          placeholder="Search students, courses, or files..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.userInfo}>
        <div>
          <p className={styles.name}>Prof. {user?.fullName || 'h'}</p>
          <p className={styles.role}>{user?.email || 'h' }</p>
        </div>
      </div>
    </header>
  );
}