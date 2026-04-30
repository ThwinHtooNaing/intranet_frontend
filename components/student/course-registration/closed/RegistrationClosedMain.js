import styles from "./RegistrationClosedMain.module.css";
import RegistrationHero from "./RegistrationHero";
import RegistrationCards from "./RegistrationCards";
import RegistrationChecklist from "./RegistrationChecklist";
import RegistrationTimeline from "./RegistrationTimeline";

export default function RegistrationClosedMain() {
  return (
    <div className={styles.page}>
      <RegistrationHero />

      <div className={styles.grid}>
        <div>
          <RegistrationCards />
          <RegistrationChecklist />

          <div className={styles.helpBar}>
            <div>
              <h3>Need Assistance?</h3>
              <p>
                Contact the Registrar&apos;s Office for technical issues or
                credit disputes.
              </p>
            </div>

            
          </div>
        </div>

        <RegistrationTimeline />
      </div>
    </div>
  );
}