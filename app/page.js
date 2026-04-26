import { redirect } from "next/navigation";
export default function Home() {
  
  const isLoggedIn = false; 
  const role = "admin";

  if (!isLoggedIn) redirect("/login");

  if (role === "admin") redirect("/admin");
  if (role === "teacher") redirect("/teacher");
  if (role === "student") redirect("/student");

  return null;
}
