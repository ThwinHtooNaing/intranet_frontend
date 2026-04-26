"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();

    const role = e.target.role.value;

    if (role === "admin") router.push("/admin");
    if (role === "teacher") router.push("/teacher");
    if (role === "student") router.push("/student");
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <select name="role">
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>

      <button type="submit">Login</button>
    </form>
  );
}
