// D:/CodeBook/frontend/src/services/authService.js

export async function login({ correo, contrasena }) {
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    return 'Error al conectar';
  }
}
