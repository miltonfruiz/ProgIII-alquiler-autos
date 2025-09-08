// import { validateReservationDates } from "../helpers/validateDates.js";
// import { Reserva } from "../models/Reserva.js";
// import { Op } from "sequelize";
// export async function validateReservation(req, res, next) {
//   const { fecha_inicio, fecha_fin, carId } = req.body; //El body del form
//   const { valid, errores } = validateReservationDates(fecha_inicio, fecha_fin);

//   //Esto se encuentra en el return del validateDates en helpers
//   if (!valid) {
//     console.log("Errores de validación de fechas:", errores);

//     return res.status(400).json({ errores });
//   }

//   //Validamos que la reserva que se vaya a a hacer no se superponga con alguna ya existente para el auto
//   try {
//     const reservasExistentes = await Reserva.findAll({
//       where: {
//         carId,
//         fecha_inicio: { [Op.lte]: fecha_fin }, //Less than
//         fecha_fin: { [Op.gte]: fecha_inicio }, // Greater than
//       },
//     });

//     if (reservasExistentes.length > 0) {
//       console.log("Reserva superpuesta encontrada:", reservasExistentes);
//       return res.status(400).json({
//         errores: {
//           disponibilidad: "El auto ya está reservado en esas fechas",
//         },
//       });
//     }
//     next();
//   } catch (error) {
//     console.error("Error al validar reserva:", error);
//     return res
//       .status(500)
//       .json({ mensaje: "Error del servidor al validar reserva" });
//   }
// }

// En tu middleware validateReservation
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
