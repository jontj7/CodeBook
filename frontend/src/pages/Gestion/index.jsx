import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";
import { obtenerEstadisticasUsuarios } from "../../services/usuarioService";

const Gestion = ({ usuario, onLogout }) => {
  const [rol, setRol] = useState("USUARIO");
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    if (usuario) {
      setRol(usuario.roles?.[0] || "USUARIO");
      console.log("✅ Usuario detectado:", usuario);
      cargarEstadisticas();
    } else {
      console.warn("⚠️ No se recibió el usuario aún.");
    }
  }, [usuario]);

  const cargarEstadisticas = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("📦 Token JWT:", token);
      const data = await obtenerEstadisticasUsuarios(token);
      console.log("📊 Estadísticas obtenidas:", data);
      setEstadisticas(data);
    } catch (error) {
      console.error("❌ Error al obtener estadísticas:", error.response?.data || error.message);
    }
  };

  if (!usuario) return <p>❌ No hay usuario</p>;
  if (!estadisticas) return <p>❌ No hay estadísticas</p>;

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Sidebar rol={rol} onLogout={onLogout} />
      <UserHeader usuario={usuario} />
      <main style={{ flex: 1, padding: "20px", position: "relative" }}>
        <h1>Dashboard de Gestión</h1>
        <p>Rol actual: <strong>{rol}</strong></p>

        <div style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}>
          <div style={cardStyle}>
            <h3>Total Usuarios</h3>
            <p style={{ fontSize: "2rem" }}>{estadisticas.total}</p>
          </div>
          <div style={cardStyle}>
            <h3>Activos</h3>
            <p style={{ fontSize: "2rem", color: "green" }}>{estadisticas.activos}</p>
          </div>
          <div style={cardStyle}>
            <h3>Inactivos</h3>
            <p style={{ fontSize: "2rem", color: "red" }}>{estadisticas.inactivos}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const cardStyle = {
  background: "#f0f0f0",
  borderRadius: "10px",
  padding: "20px",
  flex: 1,
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

export default Gestion;
