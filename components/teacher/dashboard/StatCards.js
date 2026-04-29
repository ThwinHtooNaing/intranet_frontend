import styles from "./StatCards.module.css";

export default function StatCards({ data }) {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.iconDark}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 19.5V5.5C4 4.67 4.67 4 5.5 4H20V18H5.5C4.67 18 4 18.67 4 19.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 12H14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className={styles.label}>TOTAL COURSES</p>
        <h3>{data?.totalCourses ?? 0}</h3>
      </div>

      <div className={styles.card}>
        <div className={styles.iconDark}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8 14H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 18H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="17" cy="17" r="2" fill="currentColor" />
          </svg>
        </div>

        <p className={styles.label}>TOTAL GRADES PENDING</p>
        <h3>{data?.pendingGrades ?? 0}</h3>
        <p className={styles.orange}>● Pending grades</p>
      </div>

      <div className={styles.card}>
        <div className={styles.iconDark}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 11L12 14L20 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 12V19C20 20.1 19.1 21 18 21H5C3.9 21 3 20.1 3 19V6C3 4.9 3.9 4 5 4H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className={styles.label}>New COURSES</p>
        <h3>{data?.newCourses ?? 0}</h3>
      </div>
    </div>
  );
}
