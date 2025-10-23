import cron from "node-cron";
import { Reserva } from "../src/models/Reserva.js";
import { Op } from "sequelize";

/**
 * Actualiza automáticamente las reservas que han finalizado
 * Compara fecha_fin + hora_fin con la fecha/hora actual
 */
export const actualizarReservasFinalizadas = async () => {
  try {
    const ahora = new Date();

    // Obtener todas las reservas confirmadas o pendientes
    const reservasActivas = await Reserva.findAll({
      where: {
        estado_reserva: {
          [Op.in]: ["confirmada", "pendiente"],
        },
      },
    });

    let reservasActualizadas = 0;

    for (const reserva of reservasActivas) {
      // Combinar fecha_fin y hora_fin para comparar
      const fechaHoraFin = new Date(`${reserva.fecha_fin}T${reserva.hora_fin}`);

      // Si la fecha/hora de fin ya pasó, actualizar a finalizada
      if (fechaHoraFin < ahora) {
        await reserva.update({
          estado_reserva: "finalizada",
        });
        reservasActualizadas++;
      }
    }

    return reservasActualizadas;
  } catch (error) {
    throw error;
  }
};

export const iniciarActualizacionReservas = () => {
  // Ejecutar inmediatamente al iniciar el servidor
  actualizarReservasFinalizadas();
  // Programar ejecución cada hora
  cron.schedule("0 * * * *", async () => {
    await actualizarReservasFinalizadas();
  });
};
