import EnrollmentList from "../../components/Enrollment/EnrollmentList";
import FullScreen from "../../components/General/FullScreen";
import Header from "../../components/General/Header";

export default function Enrollment() {
  return (
    <FullScreen>
      <Header />
      <EnrollmentList />
    </FullScreen>
  );
}
