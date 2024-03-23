import ClassesForm from "../../components/Classes/ClassesForm";
import FullScreen from "../../components/General/FullScreen";
import Header from "../../components/General/Header";

export default function Classes() {
  return (
    <FullScreen>
      <Header />
      <div className="d-flex justify-content-center align-items-center mh-100 py-5">
        <ClassesForm />
      </div>
    </FullScreen>
  );
}
