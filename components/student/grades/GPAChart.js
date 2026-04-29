import styles from "./GPAChart.module.css";

export default function GPAChart() {
  return (
    <div className={styles.card}>
      <h2>GPA Progression</h2>

      <div className={styles.bars}>
        <div style={{ height: "60%" }}></div>
        <div style={{ height: "70%" }}></div>
        <div style={{ height: "75%" }}></div>
        <div style={{ height: "80%" }}></div>
        <div style={{ height: "90%" }}></div>
      </div>
    </div>
  );
}