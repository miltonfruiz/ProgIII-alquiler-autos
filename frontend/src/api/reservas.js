export const crearReserva = async ({
  fecha_inicio,
  fecha_fin,
  carId,
  userId,
}) => {
  try {
    const res = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha_inicio,
        fecha_fin,
        carId,
        userId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Errores en la reserva:", data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    return { success: false, error };
  }
};
