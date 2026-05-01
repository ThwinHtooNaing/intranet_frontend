"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RegistrationHero.module.css";

export default function RegistrationHero() {
  const [status, setStatus] = useState(null);
  const router = useRouter();

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

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function enrollgo(){
    router.push("/student/course-registration/open");
  }

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={status?.isOpen ? styles.open : styles.closed}>
          {status?.isOpen ? "🟢 Registration Open" : "🔒 Registration Closed"}
        </span>

        <h1>Course Registration</h1>

        <p>
          {status?.isOpen
            ? `Registration is open for ${status.termType} ${status.academicYear}. You can enroll in available courses now.`
            : "Registration is currently closed. Please review your academic timeline and prepare for the next registration period."}
        </p>

        <div className={styles.containerdatebox}>
          <div className={styles.dateBox}>
            <span>
              📅{" "}
              {status?.isOpen
                ? "Current Registration Period"
                : "Next Registration Period"}
            </span>
            <strong>
              {status?.registrationOpen
                ? `${formatDate(status.registrationOpen)} – ${formatDate(status.registrationClose)}`
                : "No upcoming registration period"}
            </strong>
          </div>
          {status?.isOpen && (
            <div className={styles.enrollbutton}>
              <button onClick={()=>enrollgo()}>Register Now</button>
            </div>
          )}
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
