const BASE_URL = "http://localhost:8080/api/auth";

export const login = async (correo, contrasena) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ correo, contrasena })
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return await response.json();
};

export const register = async (nombre, correo, contrasena) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, correo, contrasena })
  });

  if (!response.ok) {
    throw new Error("Error al registrar");
  }

  return await response.json();
};
