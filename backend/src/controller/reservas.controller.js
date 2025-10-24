import { Reserva } from "../models/Reserva.js";
import { Car } from "../models/Car.js";
import { User } from "../models/User.js";
import { actualizarReservasFinalizadas } from "../../job/updateReservations.js";
import { Op } from "sequelize";

actualizarReservasFinalizadas();

export async function createReserva(req, res) {
  try {
    const {
      fecha_inicio,
      hora_inicio,
      fecha_fin,
      hora_fin,
      lugar_devolucion,
      carId,
      userId,
    } = req.body;

    const fecha_reserva = new Date();

    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);

    const diffTime = Math.abs(fin - inicio);
    const cant_dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Buscar el auto para obtener su precio
    const auto = await Car.findByPk(carId);
    if (!auto) {
      return res.status(404).json({ mensaje: "Auto no encontrado" });
    }

    // Calcular total e impuestos
    const total = cant_dias * auto.price;
    const tax = total * 0.21;

    const nuevaReserva = await Reserva.create({
      fecha_inicio,
      hora_inicio,
      fecha_fin,
      hora_fin,
      lugar_devolucion,
      estado_reserva: "pendiente",
      fecha_reserva,
      cant_dias,
      total,
      tax,
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
      where: {
        userId: id,
        estado_reserva: {
          [Op.in]: ["pendiente", "confirmada"],
        },
      },
      include: [
        {
          model: Car,
          attributes: ["name", "image", "brand", "price"],
        },
      ],
      order: [["fecha_inicio", "DESC"]],
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas del usuario:", error);
    res.status(500).json({ error: "Error al obtener reservas del usuario" });
  }
}
export async function getTodasLasReservas(req, res) {
  try {
    await actualizarReservasFinalizadas();

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
    const { fecha_inicio, fecha_fin, estado_reserva, hora_inicio, hora_fin } =
      req.body;

    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    // Si vienen fechas, recalcular cant_dias
    if (fecha_inicio && fecha_fin) {
      const inicio = new Date(fecha_inicio);
      const fin = new Date(fecha_fin);
      const diffTime = Math.abs(fin - inicio);
      const cant_dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      reserva.fecha_inicio = fecha_inicio;
      reserva.fecha_fin = fecha_fin;
      reserva.cant_dias = cant_dias;
    }

    // Actualizar horarios si vienen
    if (hora_inicio) reserva.hora_inicio = hora_inicio;
    if (hora_fin) reserva.hora_fin = hora_fin;

    // Si viene el estado, actualizar solo eso
    if (estado_reserva) {
      reserva.estado_reserva = estado_reserva;
    }

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

export async function deleteReserva(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Reserva.destroy({ where: { id_reserva: id } });

    if (deleted === 0) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    res.status(200).json({ mensaje: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    res.status(500).json({ mensaje: "Error al eliminar reserva" });
  }
}

export async function getPastReservationsByUser(req, res) {
  try {
    const { id } = req.params;

    // Buscar solo reservas con estado "finalizada"
    const pastReservations = await Reserva.findAll({
      where: {
        userId: id,
        estado_reserva: "finalizada",
      },
      include: [
        {
          model: Car,
          attributes: ["name", "brand", "image", "price"],
          required: false,
        },
      ],
      order: [["fecha_fin", "DESC"]], // Más recientes primero
    });

    // Formatear los datos para el frontend
    const formattedReservations = pastReservations.map((reserva) => ({
      id: reserva.id_reserva,
      auto: reserva.Car ? `${reserva.Car.name}` : "Auto eliminado",
      fecha: reserva.fecha_inicio,
      imagen: reserva.Car?.image
        ? `http://localhost:3000${reserva.Car.image}`
        : null,
      precio: parseFloat(reserva.total || 0) - parseFloat(reserva.tax || 0),
      impuestos: parseFloat(reserva.tax || 0),
      total: parseFloat(reserva.total || 0),
      fecha_fin: reserva.fecha_fin,
      hora_fin: reserva.hora_fin,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    console.error("Error al obtener reservas pasadas del usuario:", error);
    res.status(500).json({
      error: "Error al obtener reservas pasadas del usuario",
      mensaje: error.message,
    });
  }
}
