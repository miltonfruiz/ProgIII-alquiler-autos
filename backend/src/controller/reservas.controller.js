import { Reserva } from "../models/Reserva.js";
import { Car } from "../models/Car.js";

export async function createReserva(req, res) {
  try {
    const { fecha_inicio, fecha_fin, carId, userId } = req.body;

    const fecha_reserva = new Date();

    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);

    const diffTime = Math.abs(fin - inicio);
    const cant_dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const nuevaReserva = await Reserva.create({
      fecha_inicio,
      fecha_fin,
      estado_reserva: "pendiente",
      fecha_reserva,
      cant_dias,
      carId,
      userId,
    });

    res.status(201).json({
      mensaje: "Reserva creada con éxito",
      reserva: nuevaReserva,
    });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ mensaje: "Error al crear la reserva" });
  }
}
export async function getReservasPorUsuario(req, res) {
  const { id } = req.params;
  const hoy = new Date().toISOString().split("T")[0];
  try {
    const reservas = await Reserva.findAll({
      where: { userId: id },
      include: [
        {
          model: Car,
          attributes: ["name", "image", "brand", "price"],
        },
      ],
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas del usuario:", error);
    res.status(500).json({ error: "Error al obtener reservas del usuario" });
  }
}
