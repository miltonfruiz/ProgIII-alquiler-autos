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
    hora_fin,
  );

  console.log("ERRORES QUE VIENEN DEL VALIDATE RESERVATION", errores);

  if (!valid) {
    return res.status(400).json({
      errores: {
        disponibilidad: Object.values(errores)[0], // muestra el primer error específico
      },
    });
  }

  try {
    console.log("Verificando disponibilidad para carId:", carId);

    const reservasExistentes = await Reserva.findAll({
      where: {
        carId,
        estado_reserva: { [Op.notIn]: ["cancelada"] },
        fecha_inicio: { [Op.lte]: fecha_fin },
        fecha_fin: { [Op.gte]: fecha_inicio },
      },
    });

    console.log("Reservas existentes encontradas:", reservasExistentes.length);

    if (reservasExistentes.length > 0) {
      return res.status(400).json({
        errores: {
          disponibilidad: `El auto no está disponible del ${fecha_inicio} al ${fecha_fin}`,
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
