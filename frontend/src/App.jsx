import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import Home from "./pages/home/Home";
import Register from "./features/auth/Register";

const App = () => {
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem("usuario");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogout = () => {
      localStorage.removeItem("usuario");
      setUsuario(null); // 💥 Esto fuerza el re-render
    };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={!usuario ? <Login onLoginSuccess={setUsuario} /> : <Navigate to="/home" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={usuario ? <Home usuario={usuario} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
