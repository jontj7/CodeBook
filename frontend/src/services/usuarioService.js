import axios from "axios";

const API_URL = "http://localhost:8080/api/usuario";

export const obtenerEstadisticasUsuarios = async (token) => {
  const response = await axios.get(`${API_URL}/estadisticas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
