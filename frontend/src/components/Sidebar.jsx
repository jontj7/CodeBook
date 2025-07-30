import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

// Recibimos la prop onLogout
const Sidebar = ({ rol, onLogout }) => {
  return (
    <aside className="sidebar">
      <h2>CODE BOOK</h2>
      <nav>
        <p className="section">PERSONAL</p>
        <ul>
          <li>  <Link to="/home">Inicio</Link></li>
          <li><Link to="/explorar">Explorar</Link></li>
          <li><Link to="/guardado">Guardado</Link></li>
        </ul>

        {rol === "ADMIN" && (
          <>
            <p className="section">ADMINISTRACION</p>
            <ul>
              <li>
                <Link to="/home">Inicio</Link>
              </li>

              <li><Link to="/usuarios">Usuarios</Link></li>
              <li><Link to="/gestion">Gestión</Link></li>
            </ul>
          </>
        )}
    </nav>

        <button onClick={onLogout} className="logout-btn">
          Cerrar sesión
        </button>

    </aside>
  );
};

export default Sidebar;
