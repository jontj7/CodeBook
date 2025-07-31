import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader"; // 👈 nuevo

const Gestion = ({ usuario, onLogout }) => {
  const [rol, setRol] = useState("USUARIO");

  useEffect(() => {
    if (usuario) {
      setRol(usuario.roles?.[0] || "USUARIO");
    }
  }, [usuario]);

  if (!usuario) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Sidebar rol={rol} onLogout={onLogout} />
      <UserHeader usuario={usuario} /> {/* ✅ Lo agregás aquí */}
      <main style={{ flex: 1, padding: "20px", position: "relative" }}>
        <h1>Página de Gestión</h1>
        <p>Contenido exclusivo para el rol <strong>{rol}</strong>.</p>
      </main>
    </div>
  );
};

export default Gestion;
