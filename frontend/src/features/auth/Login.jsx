import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const usuario = await login(correo, contrasena); // <- API devuelve directamente al usuario

      // Guardar en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirigir según el rol
      if (usuario.roles.includes("ADMIN")) {
        navigate("/admin-panel");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Correo o contraseña incorrectos");
      console.error("Error de login:", err);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%" }}>Ingresar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
