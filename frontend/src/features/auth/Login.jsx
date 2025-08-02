import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/authService";
import "../../styles/login.css";

const Login = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ correo, contrasena });

      // ✅ Guardar el token en localStorage
      localStorage.setItem("token", token);

      // ✅ Guardar el usuario (solo el correo, ya que no viene del backend)
      const usuario = { correo };
      localStorage.setItem("usuario", JSON.stringify(usuario));

      if (onLoginSuccess) onLoginSuccess(usuario);
      navigate("/home"); // o /gestion si preferís
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(nombre, correo, contrasena);
      setIsLogin(true);
    } catch (err) {
      setError("Error al registrar");
    }
  };

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
