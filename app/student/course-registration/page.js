import ClosedPage from "./closed/page";
import OpenPage from "./open/page";

export default function CourseRegistrationPage() {
  
  const isRegistrationOpen = false;

  return isRegistrationOpen ? <OpenPage /> : <ClosedPage />;
}