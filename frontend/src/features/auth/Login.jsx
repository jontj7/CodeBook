import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/authService";
import "../../styles/login.css"; // Asegúrate de que esté en .css plano

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usuario = await login(correo, contrasena);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      usuario.roles.includes("ADMIN")
        ? navigate("/admin-panel")
        : navigate("/home");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(nombre, correo, contrasena);
      setIsLogin(true); // Vuelve al login
    } catch (err) {
      setError("Error al registrar");
    }
  };

  // 🔁 Clases de animación dinámicas
  const animationClass = isLogin ? "bounceRight" : "bounceLeft";

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">¿No tienes cuenta?</h2>
            <p className="user_unregistered-text">
              Regístrate para usar la biblioteca virtual
            </p>
            <button
              className="user_unregistered-signup"
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">¿Ya tienes cuenta?</h2>
            <p className="user_registered-text">
              Inicia sesión para continuar
            </p>
            <button
              className="user_registered-login"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </div>

        <div className={`user_options-forms ${animationClass}`}>
          {/* FORMULARIO LOGIN */}
          <div className="user_forms-login">
            <h2 className="forms_title">Login</h2>
            <form className="forms_form" onSubmit={handleLogin}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  ¿Olvidaste tu contraseña?
                </button>
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>

          {/* FORMULARIO SIGNUP */}
          <div className="user_forms-signup">
            <h2 className="forms_title">Sign Up</h2>
            <form className="forms_form" onSubmit={handleRegister}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="forms_field-input"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
        </div>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
