import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import Home from "./pages/home/Home";
import AdminPanel from "./pages/admin/AdminPanel";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página de inicio/login */}
        <Route path="/" element={<Login />} />

        {/* Vista principal para usuarios */}
        <Route path="/home" element={<Home />} />

        {/* Panel privado para administradores */}
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
