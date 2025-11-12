import { validateReservationDates } from "../helpers/validateDates.js";
import { Reserva } from "../models/Reserva.js";
import { Op } from "sequelize";

export async function validateReservation(req, res, next) {
  console.log("=== MIDDLEWARE VALIDATION ===");
  console.log("req.body:", req.body);

  const {
    fecha_inicio,
    fecha_fin,
    hora_inicio,
    hora_fin,
    lugar_devolucion,
    carId,
  } = req.body;

  console.log("Validando fechas:", {
    fecha_inicio,
    fecha_fin,
    lugar_devolucion,
    carId,
  });

  const { valid, errores } = validateReservationDates(
    fecha_inicio,
    fecha_fin,
    hora_inicio,
    hora_fin
  );

  if (!valid) {
    console.log("Errores de validación de fechas:", errores);
    return res.status(400).json({ errores });
  }

  try {
    console.log("Verificando disponibilidad para carId:", carId);

    const reservasExistentes = await Reserva.findAll({
      where: {
        carId,
        fecha_inicio: { [Op.lte]: fecha_fin },
        fecha_fin: { [Op.gte]: fecha_inicio },
      },
    });

    console.log("Reservas existentes encontradas:", reservasExistentes.length);

    if (reservasExistentes.length > 0) {
      console.log("Reserva superpuesta encontrada:", reservasExistentes);
      return res.status(400).json({
        errores: {
          disponibilidad: "El auto ya está reservado en esas fechas",
        },
      });
    }

    console.log("Validación exitosa, pasando al controller");
    next();
  } catch (error) {
    console.error("Error en middleware de validación:", error);
    return res.status(500).json({
      mensaje: "Error del servidor al validar reserva",
      error: error.message,
    });
  }
}
