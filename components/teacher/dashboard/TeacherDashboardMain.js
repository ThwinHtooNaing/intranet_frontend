"use client"
import StatCards from "./StatCards";
import UpcomingSchedule from "./UpcomingSchedule";
import QuickFilters from "./QuickFilters";
import PerformanceCard from "./PerformanceCard";
import styles from "./TeacherDashboardMain.module.css";
import {useState,useEffect} from 'react';

export default function TeacherDashboardMain() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [userId,setUserId] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserId(JSON.parse(storedUser)?.userId);
    }
  }, []);

  

   useEffect(() => {
     if (!userId) return;

     const fetchStats = async () => {
       try {
         const res = await fetch(
           `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/dashboard/${userId}/stats`,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           },
         );

         const data = await res.json();
         setStats(data);
       } catch (err) {
         console.error("Failed to fetch stats:", err);
       }
     };

     fetchStats();
   }, [userId]);
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h2>Welcome back, Prof. {user?.fullName}</h2>
        <p>Here is what is happening across your courses today.</p>
      </div>

      <StatCards data={stats} />

      <div className={styles.mainGrid}>
        <UpcomingSchedule />

        <div className={styles.sideColumn}>
          <QuickFilters />
          <PerformanceCard />
        </div>
      </div>
    </div>
  );
}