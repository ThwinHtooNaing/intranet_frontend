import { useEffect, useState } from "react";
import styles from "./RegistrationStatusPanel.module.css";

export default function RegistrationStatusPanel({ termId }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [user,setUser] = useState(null);

  
  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const data = JSON.parse(item);
      setUser(data);
    }
  }, []);

  useEffect(() => {
    if (!termId || !user?.userId) return;

    const fetchSummary = async () => {
      try {
        const res = await fetch(

          // make this dynamic userId, termId
          `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/summary?userId=${user?.userId}&termId=11`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch registration summary:", err);
      }
    };

    fetchSummary();
  }, [termId,user?.userId]);

  const handlePay = async () => {
    if (!termId) return;

    setPaying(true);
    setError("");

    try {
      const res = await fetch(
        // make those dynamic userId and termId
        `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/students/pay?userId=${user?.userId}&termId=${termId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message  || "Payment failed");
      }

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setPaying(false);
    }
  };

  const totalFee = summary?.totalFee ?? 0;
  const isPaid = summary?.paymentStatus === "PAID";

  return (
    <aside className={styles.side}>
      <div className={styles.card}>
        <h3>Registration Summary</h3>

        <div className={styles.summaryGrid}>
          <div>
            <strong>{summary?.totalCredits ?? 0}</strong>
            <span>Total Credits</span>
          </div>

          <div>
            <strong>{summary?.enrolledCourseCount ?? 0}</strong>
            <span>Courses</span>
          </div>
        </div>

        <div className={styles.feeBox}>
          <span>Total Fee</span>
          <strong>{(summary?.totalFee ?? 0).toLocaleString()} THB</strong>
        </div>

        <div className={styles.statusBox}>
          <span>Payment Status</span>
          <strong>{summary?.paymentStatus ?? "NOT_STARTED"}</strong>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.payButton}
          onClick={handlePay}
          disabled={
            !summary?.registrationId || totalFee <= 0 || isPaid || paying
          }
        >
          {isPaid ? "Paid" : paying ? "Processing..." : "Pay Now"}
        </button>

        <p className={styles.termText}>
          Term: {summary?.term ?? "Current Term"}
        </p>

      </div>
    </aside>
  );
}
