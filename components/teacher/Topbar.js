'use client';

import styles from './Topbar.module.css';

export default function Topbar() {
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
          <p className={styles.name}>Prof. Einstein</p>
          <p className={styles.role}>Senior Researcher</p>
        </div>
      </div>
    </header>
  );
}