import FullScreen from "../../components/General/FullScreen";
import Header from "../../components/General/Header";
import HomeItem from "../../components/General/HomeItem";
import { BsBagPlusFill, BsClockFill, BsBookFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/auth";

export default function Home() {
  const user = getUser();
  const navigate = useNavigate();

  const iconProps = {
    size: 60,
    color: "#fff",
    className: "pointer",
  };

  return (
    <FullScreen>
      <Header />
      <div className="container-fluid px-5">
        <div className="row">
          <HomeItem
            label="Realizar matrícula"
            isPermitted={user.type === "student" && user.enrolled === false}
            action={() => navigate("/enrollment")}
            icon={<BsBagPlusFill {...iconProps} />}
          />
          <HomeItem
            label="Grade de horários"
            isPermitted={user.type === "student"}
            action={() => navigate("/schedule")}
            icon={<BsClockFill {...iconProps} />}
          />
          <HomeItem
            label="Cadastrar curso"
            isPermitted={user.type === "admin"}
            action={() => navigate("/classes")}
            icon={<BsBookFill {...iconProps} />}
          />
        </div>
      </div>
    </FullScreen>
  );
}
