export const CrearPago = async (
  pago,
  id_ulitmo_usuario,
  id_ultimo_auto,
  id_ultima_reserva
) => {
  try {
    const response = await fetch("http://localhost:3000/pagos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pago),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en CrearPago:", error);
    throw error;
  }
};

export const ObtenerAutos = async () => {
  try {
    const response = await fetch("http://localhost:3000/cars", {
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
    return error;
  }
};

export const ObtenerUsuarios = async () => {
  try {
    const response = await fetch("http://localhost:3000/users", {
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
    return error;
  }
};
