import React, { useState } from "react";
import "../styles/userHeader.css";


const UserHeader = ({ usuario, onLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const nombre = usuario?.nombre || "Usuario";
  const rol = usuario?.roles?.[0] || "Usuario";
  const avatarUrl = `https://i.pravatar.cc/40?u=${usuario.correo}`;

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <div className="user-header">
      <button className="bell-btn">
        <i className="bell-icon">🔔</i>
      </button>

      <div className="user-info" onClick={toggleMenu}>
        <img src={avatarUrl} alt="Avatar" className="avatar" />
        <div>
          <p className="user-name">{nombre}</p>
          <p className="user-role">{rol === "ADMIN" ? "Administrador" : "Usuario"}</p>
        </div>
        <span className="arrow">▾</span>

        {menuAbierto && (
          <ul className="user-dropdown">
            <li>⚙️ Configuración</li>
            <li>🔒 Cambiar contraseña</li>
            <li>📄 Mi perfil</li>
            <li onClick={onLogout}>🚪 Cerrar sesión</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
