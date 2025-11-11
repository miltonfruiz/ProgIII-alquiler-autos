export const obtenerAutos = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `http://localhost:3000/cars?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los autos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerAutos:", error);
    throw error;
  }
};
