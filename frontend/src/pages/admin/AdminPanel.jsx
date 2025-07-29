import React from "react";

const AdminPanel = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div>
      <h1>Panel del Administrador</h1>
      <p>Bienvenido, {usuario?.correo}</p>
    </div>
  );
};

export default AdminPanel;
