import { Reserva } from "../models/Reserva.js";
import { Car } from "../models/Car.js";
import { User } from "../models/User.js";

export async function createReserva(req, res) {
  try {
    const { fecha_inicio, fecha_fin, carId, userId } = req.body;

    const fecha_reserva = new Date();

    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);

    const diffTime = Math.abs(fin - inicio);
    const cant_dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const nuevaReserva = await Reserva.create({
      fecha_inicio,
      fecha_fin,
      estado_reserva: "pendiente",
      fecha_reserva,
      cant_dias,
      carId,
      userId,
    });
    const reservaConDatos = await Reserva.findOne({
      where: { id_reserva: nuevaReserva.id_reserva },
      include: [
        {
          model: Car,
          attributes: ["name", "brand", "image"],
        },
        {
          model: User,
          attributes: ["nombre", "apellido", "correo"],
        },
      ],
    });
    res.status(201).json({
      mensaje: "Reserva creada con éxito",
      reserva: reservaConDatos,
    });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ mensaje: "Error al crear la reserva" });
  }
}
export async function getReservasPorUsuario(req, res) {
  const { id } = req.params;
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
export async function getTodasLasReservas(req, res) {
  try {
    const reservas = await Reserva.findAll({
      include: [
        {
          model: Car,
          attributes: ["name", "brand", "image"],
        },
        {
          model: User,
          attributes: ["nombre", "apellido", "correo"],
        },
      ],
    });
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener todas las reservas:", error);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
}
export async function updateReserva(req, res) {
  try {
    const { id } = req.params;
    const { fecha_inicio, fecha_fin } = req.body;
    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);
    const diffTime = Math.abs(fin - inicio);
    const cant_dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
    reserva.fecha_inicio = fecha_inicio;
    reserva.fecha_fin = fecha_fin;
    reserva.cant_dias = cant_dias;
    await reserva.save();
    const reservaActualizada = await Reserva.findByPk(id, {
      include: [User, Car],
    });
    res.status(200).json(reservaActualizada);
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    res.status(500).json({ mensaje: "Error al actualizar reserva" });
  }
}
