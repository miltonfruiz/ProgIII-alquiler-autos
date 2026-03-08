// frontend/src/api/reservas.js
const API_BASE_URL = "http://localhost:3000";

export const crearReserva = async (reservaData) => {
  try {
    console.log("Enviando datos al backend:", reservaData);

    const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;

    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ← acá se manda el token
      },
      body: JSON.stringify(reservaData),
    });

    console.log("Status de respuesta:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);

      // Devolver el mensaje específico de error
      return {
        success: false,
        error: errorData,
        errores: errorData.errores,
      };
    }

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    return { success: true, data };
  } catch (error) {
    console.error("Error en crearReserva:", error);
    return { success: false, error: error.message };
  }
};
