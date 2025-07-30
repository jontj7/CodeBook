import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../styles/home.css";

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
    <div style={{ display: "flex" }}>
      {/* ✅ Pasamos onLogout al Sidebar */}
      <Sidebar rol={rol} onLogout={onLogout} />
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>Bienvenido al Home</h1>
        <p>Hola, <strong>{usuario.nombre || usuario.correo}</strong></p>
      </main>
    </div>
  );
};

export default Home;
