import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ importar navegación
import { login } from "../../services/authService"; // ✅ sube dos niveles



function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // ⬅️ hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ correo, contrasena });

    if (result === "Login exitoso ✅") {
      setMensaje(result);
      setTimeout(() => {
        navigate("/home"); // ⬅️ redirige al home
      }, 1000); // espera 1s para mostrar el mensaje
    } else {
      setMensaje(result);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
