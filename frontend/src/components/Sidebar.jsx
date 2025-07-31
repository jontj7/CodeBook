import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

import iconInicio from "../assets/icon-inicio.svg";
import iconExplorar from "../assets/icon-folder.svg";
import iconGuardado from "../assets/icon-libro.svg";
import iconUsuarios from "../assets/icon-usuarios.svg";
import iconGestion from "../assets/icon-herramienta.svg";
import iconEstadistica from "../assets/icon-estadistica.svg";

const Sidebar = ({ rol, onLogout }) => {
  return (
    <aside className="sidebar">
      <h2>CODE BOOK</h2>
      <nav>
        <p className="section">PERSONAL</p>
        <ul>
          <li>
            <Link to="/home" className="sidebar-link">
              <img src={iconInicio} alt="Inicio" className="icon" />
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/explorar" className="sidebar-link">
              <img src={iconExplorar} alt="Explorar" className="icon" />
              Explorar
            </Link>
          </li>
          <li>
            <Link to="/guardado" className="sidebar-link">
              <img src={iconGuardado} alt="Guardado" className="icon" />
              Guardado
            </Link>
          </li>
        </ul>

        {rol === "ADMIN" && (
          <>
            <p className="section">ADMINISTRACION</p>
            <ul>
              <li>
                <Link to="/Usuarios/index" className="sidebar-link">
                  <img src={iconUsuarios} alt="Usuarios" className="icon" />
                  Usuarios
                </Link>
              </li>
              <li>
                <Link to="/gestion" className="sidebar-link">
                  <img src={iconGestion} alt="Gestión" className="icon" />
                  Gestión
                </Link>
              </li>
              <li>
                <Link to="/estadistica" className="sidebar-link">
                  <img src={iconEstadistica} alt="Estadística" className="icon" />
                  Estadística
                </Link>
              </li>
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
