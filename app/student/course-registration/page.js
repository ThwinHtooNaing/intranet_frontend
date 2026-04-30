import ClosedPage from "./closed/page";
import OpenPage from "./open/page";

export default function CourseRegistrationPage() {
  // 🔁 CHANGE THIS LATER (API / DB)
  const isRegistrationOpen = false;

  return isRegistrationOpen ? <OpenPage /> : <ClosedPage />;
}