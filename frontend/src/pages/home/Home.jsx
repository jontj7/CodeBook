import React from "react";

const Home = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log("Usuario cargado:", usuario);

  return (
    <div>
      <h1>Test Home</h1>
      {usuario ? (
        <p>Bienvenido, {usuario.correo}</p>
      ) : (
        <p>No hay usuario guardado</p>
      )}
    </div>
  );
};

export default Home; // 🔥 ESTA LÍNEA ES CLAVE
