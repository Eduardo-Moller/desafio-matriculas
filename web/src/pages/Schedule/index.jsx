import FullScreen from "../../components/general/FullScreen";
import Header from "../../components/general/Header";
import ScheduleList from "../../components/Schedule/ScheduleList";

export default function Schedule() {
  return (
    <FullScreen>
      <Header />
      <ScheduleList />
    </FullScreen>
  );
}
