import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { validateToken, getToken } from "./services/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import Enrollment from "./pages/Enrollment";
import Classes from "./pages/Classes";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getToken();

      if (token) {
        try {
          await validateToken();
          setIsAuthenticated(true);
        } catch (error) {
          toast.dismiss();
          toast.error("Sessão expirada, efetue o login novamente.");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsCheckingAuth(false);
    };

    checkAuthentication();
  }, []);

  if (isCheckingAuth) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/schedule"
          element={<PrivateRoute element={<Schedule />} />}
        />
        <Route
          path="/enrollment"
          element={<PrivateRoute element={<Enrollment />} />}
        />
        <Route
          path="/classes"
          element={<PrivateRoute element={<Classes />} />}
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
