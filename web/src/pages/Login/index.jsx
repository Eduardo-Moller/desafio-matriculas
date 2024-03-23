import Logo from "../../components/General/Logo";
import LoginForm from "../../components/Login/LoginForm";
import FullScreen from "../../components/General/FullScreen";
export default function Login() {
  return (
    <FullScreen>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-12">
            <div className="card rounded">
              <div className="row">
                <div className="col-5 d-flex align-items-center rounded-start bgPrimaryUni">
                  <Logo />
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
}
