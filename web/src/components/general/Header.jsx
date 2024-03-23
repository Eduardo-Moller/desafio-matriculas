import Logo from "./Logo";
import { BsBoxArrowRight } from "react-icons/bs";
import { authLogout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/auth";

export default function Header() {
  const navigate = useNavigate();
  const user = getUser();

  return (
    <>
      <header className="d-flex justify-content-around bgPrimaryUni py-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 col-md-4 mx-auto">
              <div className="w-logo-header">
                <Logo />
              </div>
            </div>
            <div className="col-md-4 d-none d-sm-flex justify-content-center align-items-center">
              <h1 className="text-white fs-3 fw-bold">
                {user ? `Olá, ${user.name}` : "Olá, usuário"}
              </h1>
            </div>
            <div className="col-6 col-md-4 d-flex justify-content-end align-items-center pe-5">
              <BsBoxArrowRight
                size={32}
                color="#fff"
                className="pointer"
                onClick={() => authLogout(navigate)}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
