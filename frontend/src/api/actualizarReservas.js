export const ObtenerReservas = async () => {
  try {
    const response = await fetch("http://localhost:3000/reservas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en ObtenerReservas:", error);
    throw error; // se retorna array vacio para que no falle el codigo que llama a esta funcion
  }
};

export const ConfirmarReserva = async (reservas) => {
  if (!reservas || reservas.length === 0) {
    console.log("No hay reservas para confirmar.");
    return null;
  }
  const ultimaReserva = reservas[reservas.length - 1];
  console.log(ultimaReserva);
  try {
    const response = await fetch(
      `http://localhost:3000/reservas/${ultimaReserva.id_reserva}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_reserva: "confirmada",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en ActualizarReservas:", error);
    throw error;
  }
};

export const CancelarReserva = async (reservas) => {
  if (!reservas || reservas.length === 0) {
    console.log("No hay reservas para cancelar.");
    return null;
  }

  const ultimaReserva = reservas[reservas.length - 1];
  try {
    const response = await fetch(
      `http://localhost:3000/reservas/${ultimaReserva.id_reserva}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_reserva: "cancelada",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en ActualizarReservas:", error);
    throw error;
  }
};
