import cron from "node-cron";
import { Reserva } from "../src/models/Reserva.js";
import { Op } from "sequelize";

/**
 * Actualiza automáticamente las reservas que han finalizado
 */
export const actualizarReservasFinalizadas = async () => {
  try {
    const ahora = new Date();

    const reservasActivas = await Reserva.findAll({
      where: {
        estado_reserva: {
          [Op.in]: ["confirmada", "pendiente"],
        },
      },
    });

    let reservasActualizadas = 0;

    for (const reserva of reservasActivas) {
      const fechaHoraFin = new Date(`${reserva.fecha_fin}T${reserva.hora_fin}`);

      if (fechaHoraFin < ahora) {
        await reserva.update({
          estado_reserva: "finalizada",
        });
        reservasActualizadas++;
      }
    }

    return reservasActualizadas;
  } catch (error) {
    console.error("Error actualizando reservas:", error);
  }
};

export const iniciarActualizacionReservas = () => {
  // Ejecutar cada hora
  cron.schedule("0 * * * *", async () => {
    await actualizarReservasFinalizadas();
  });
};
