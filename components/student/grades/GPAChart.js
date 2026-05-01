import { useEffect, useState } from "react";
import styles from "./GPAChart.module.css";

export default function GPAChart() {
  const [user, setUser] = useState(null);
  const [gpaData, setGpaData] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      setUser(JSON.parse(item));
    }
  }, []);

  useEffect(() => {
    const fetchGpaTrend = async () => {
      try {

        // make this dynamic
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/gpa-trend?userId=${user?.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();
        setGpaData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch GPA trend:", err);
        setGpaData([]);
      }
    };

    fetchGpaTrend();
  }, [user?.userId]);

  console.log(user?.userId);

  return (
    <div className={styles.card}>
      <h2 style={{ color: "var(--primary)" }}>GPA Progression</h2>

      <div className={styles.bars}>
        {gpaData.length === 0 ? (
          <p className={styles.empty}>No GPA data available.</p>
        ) : (
          gpaData.map((item) => {
            const percent = Math.min((item.gpa / 4.0) * 100, 100);

            return (
              <div className={styles.barWrapper} key={item.termId}>
                <div className={styles.barArea}>
                  <div
                    className={styles.bar}
                    style={{ height: `${percent}%` }}
                    title={`${item.term}: ${item.gpa}`}
                  >
                    <span className={styles.value}>{item.gpa.toFixed(2)}</span>
                  </div>
                </div>

                <div className={styles.label}>
                  <p>{item.termType}</p>
                  <small>{item.academicYear}</small>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
