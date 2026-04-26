"use client";

import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  function handleSignIn(e) {
    e.preventDefault();

    const role = e.target.role.value;

    if (role === "admin") router.push("/admin");
    if (role === "teacher") router.push("/teacher");
    if (role === "student") router.push("/student");
  }

  return (
    <form onSubmit={handleSignIn}>
      <h1>Sign In</h1>

      <select name="role">
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>

      <button type="submit">Sign In</button>
    </form>
  );
}
