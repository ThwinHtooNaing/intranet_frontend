import styles from "./PerformanceCard.module.css";

export default function PerformanceCard() {
  return (
    <section className={styles.card}>
      <h3>Teaching Performance</h3>
      <p>Your student feedback score increased by 12% this month.</p>

      <div className={styles.bottom}>
        <div className={styles.avatars}>
          <span>👨‍🎓</span>
          <span>👩‍🎓</span>
          <b>+140</b>
        </div>

        <button>Review Now</button>
      </div>

      <span className={styles.star}>★</span>
    </section>
  );
}