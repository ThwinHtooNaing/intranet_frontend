import styles from "./RegistrationHero.module.css";

export default function RegistrationHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.closed}>🔒 Registration Closed</span>

        <h1>Course Registration</h1>
        <p>
          Registration is currently closed. You can enroll in new semester courses when registration opens. Please review your academic timeline and ensure all prerequisites are met before the next period.
        </p>
        <div className={styles.dateBox}>
          <span>📅 Next Registration Period</span>
          <strong>May 20 – June 5, 2026</strong>
        </div>
      </div>

      <div className={styles.imageBox}>
        <div className={styles.fakeImage}>
          <div className={styles.screen}></div>
          <div className={styles.book}></div>
        </div>
      </div>
    </section>
  );
}