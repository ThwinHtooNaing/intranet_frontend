import styles from "./RegistrationCards.module.css";

export default function RegistrationCards() {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.icon}>📖</div>
        <span>Status</span>
        <h3>My Current Courses</h3>

        <div className={styles.footer}>
          <p>Active Credits</p>
          <strong>18.0</strong>
        </div>

        <div className={styles.progress}>
          <div></div>
        </div>

        <small>4 courses in progress</small>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <span>Academic History</span>
        <h3>Completed Courses</h3>

        <div className={styles.stats}>
          <div>
            <strong>42</strong>
            <p>Credits Earned</p>
          </div>

          <div>
            <strong>3.85</strong>
            <p>Cumulative GPA</p>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>🎧</div>
        <span>Support</span>
        <h3>Academic Advisor</h3>

        <div className={styles.advisor}>
          <div className={styles.avatar}>S</div>
          <div>
            <strong>Dr. Sarah Miller</strong>
            <p>Faculty of Sciences</p>
          </div>
        </div>

        <button>Schedule Meeting</button>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>💳</div>
        <span>Financials</span>
        <h3>Credit Limits</h3>

        <div className={styles.moneyRow}>
          <span>Standard Max</span>
          <strong>21 Credits</strong>
        </div>

        <div className={styles.moneyRow}>
          <span>Overload Fee</span>
          <strong>$450/cr</strong>
        </div>

        <p className={styles.note}>Your scholarship covers up to 18 credits.</p>
      </div>
    </div>
  );
}