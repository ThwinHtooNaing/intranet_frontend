"use client"
import styles from "./RegistrationClosedMain.module.css";
import RegistrationHero from "./RegistrationHero";
import RegistrationCards from "./RegistrationCards";
import RegistrationTimeline from "./RegistrationTimeline";
import {useState,useEffect} from 'react';
import {useRouter} from 'next/navigation'

export default function RegistrationClosedMain() {
  const [status, setStatus] = useState(null);
  const [dashboardCards, setDashboardCards] = useState(null);
  
    useEffect(() => {
      const fetchStatus = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/registration-status`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
  
          const data = await res.json();
          setStatus(data);
        } catch (err) {
          console.error("Failed to fetch registration status:", err);
        }
      };
  
      fetchStatus();
    }, []);

    useEffect(() => {
      // if (!status?.termId) return;

      const fetchDashboardCards = async () => {
        try {
          const res = await fetch(
            // Make it dynamic
            `${process.env.NEXT_PUBLIC_API_URL}/api/students/dashboard-cards?userId=1&termId=11`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          const data = await res.json();
          setDashboardCards(data);
        } catch (err) {
          console.error("Failed to fetch dashboard cards:", err);
        }
      };

      fetchDashboardCards();
    }, [status?.termId]);

  return (
    <div className={styles.page}>
      <RegistrationHero />

      <div className={styles.grid}>
        <div>
          <RegistrationCards summary={dashboardCards} />

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

        <RegistrationTimeline registrationStatus={status} />
      </div>
    </div>
  );
}