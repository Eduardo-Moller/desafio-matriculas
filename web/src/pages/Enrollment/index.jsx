import EnrollmentList from "../../components/Enrollment/EnrollmentList";
import FullScreen from "../../components/general/FullScreen";
import Header from "../../components/general/Header";

export default function Enrollment() {
  return (
    <FullScreen>
      <Header />
      <EnrollmentList />
    </FullScreen>
  );
}
