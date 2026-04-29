import styles from "./StatCards.module.css";

export default function StatCards() {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.iconDark}>m</div>
        
        <p className={styles.label}>TOTAL COURSES</p>
        <h3>12</h3>
        <p className={styles.green}>↗ 2 new this semester</p>
      </div>

      <div className={styles.card}>
        <div className={styles.iconDark}>f</div>
       
        <p className={styles.label}>TOTAL GRADES PENDING</p>
        <h3>48</h3>
        <p className={styles.orange}>● Due in 3 days</p>
      </div>

      <div className={styles.card}>
        <div>
          <p className={styles.label}>AVG. ATTENDANCE</p>
          <h3>94%</h3>
          <p className={styles.text}>Overall faculty average</p>
        </div>

        <div className={styles.circle}>94%</div>
      </div>
    </div>
  );
}