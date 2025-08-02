export async function login({ correo, contrasena }) {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const token = await response.text(); // texto plano desde Spring Boot
    return { token }; // ✅ lo devolvés como objeto
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}
