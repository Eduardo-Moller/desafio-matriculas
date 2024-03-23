import api from "./api";

export function getToken() {
  return sessionStorage.getItem("token");
}

async function setToken(token) {
  sessionStorage.setItem("token", token);
}

export async function authLogin(credentials) {
  try {
    const { status, data } = await api.post("/auth/login", credentials);
    if (status === 200) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function validateToken() {
  try {
    const { status, data } = await api.get("/auth/rest/token");
    if (status === 200) {
      setToken(data.newToken);
    }
    return status === 200 && data;
  } catch (error) {
    throw error;
  }
}

export function getUser() {
  return JSON.parse(sessionStorage.getItem("user"));
}

export async function authLogout(navigate) {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  navigate("/login");
  return true;
}
