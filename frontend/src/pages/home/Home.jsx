import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader"; // 👈 nuevo

const Home = ({ usuario, onLogout }) => {
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
      <main style={{ flex: 1, padding: "20px", position: "relative" }}>
        <UserHeader usuario={usuario} /> {/* ✅ Lo agregás aquí */}
        <h1>Bienvenido al Home</h1>
        <p>
          Hola, <strong>{usuario.nombre || usuario.correo}</strong>
        </p>
      </main>
    </div>
  );
};

export default Home;
