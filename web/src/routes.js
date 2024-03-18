import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// const navigate = useNavigate();

// function PrivateRoute({ element, ...rest }) {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   if (!token) {
//     navigate("/login");
//     return null;
//   }
//   return <Route {...rest} element={element} />;
// }

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello world!</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" component={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
