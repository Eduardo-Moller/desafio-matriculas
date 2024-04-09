import React, { useState } from "react";
import Button from "../general/Button";
import Input from "../general/Input";
import { authLogin } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    if (login === "") {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (loginError || passwordError) return;

    try {
      await authLogin({ login, password });
      navigate("/");
    } catch (error) {
      switch (error.response.status) {
        case 401:
          toast.error("Usuário ou senha inválidos");
          break;
        case 400:
          toast.error("Requisição inválida");
          break;
        case 500:
          toast.error("Erro interno no servidor");
          break;
        default:
          toast.error("Erro desconhecido");
          break;
      }
    }
  };

  return (
    <>
      <form>
        <h5 className="fw-normal mb-3 pb-3 fw-bold">Faça seu login</h5>
        <div className="form-outline mb-4">
          <Input
            label={"Login"}
            placeholder={"Digite seu login"}
            handleChange={setLogin}
            value={login}
            error={loginError && "Campo obrigatório"}
            type={"email"}
            id={"email"}
            required
          />
        </div>

        <div className="form-outline mb-4">
          <Input
            label={"Senha"}
            placeholder={"Digite sua senha"}
            handleChange={setPassword}
            value={password}
            error={passwordError && "Campo obrigatório"}
            type={"password"}
            id={"password"}
            required
          />
        </div>

        <div className="w-100 mb-5">
          <Button label={"Login"} action={handleLogin} />
        </div>
        <p className="mb-5 pb-lg-2 textPrimaryUni">
          Ainda não possui uma conta?{" "}
          <a href="https://ead.unisinos.br" target="_blank">
            Entre em contato com a faculdade
          </a>
        </p>
      </form>
    </>
  );
}
