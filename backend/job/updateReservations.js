import cron from "node-cron";
import { Reserva } from "../src/models/Reserva.js";
import { Op } from "sequelize";

// Tarea programada para actualizar el estado de las reservas diariamente a la medianoche
export const iniciarActualizacionReservas = () => {
  cron.schedule("1 0 0 * * *", async () => {
    try {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Inicio del día
      const result = await Reserva.update(
        { estado_reserva: "finalizada" },
        {
          where: {
            fecha_fin: {
              [Op.lt]: hoy,
            },
            estado_reserva: {
              [Op.in]: ["confirmada", "pendiente"],
            },
          },
        }
      );
    } catch (error) {
      console.error("Error al actualizar el estado de las reservas:", error);
    }
  });
};
