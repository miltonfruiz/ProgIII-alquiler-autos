import { Router } from "express";
import {
  getReservasPorUsuario,
  createReserva,
  getTodasLasReservas,
  updateReserva,
  deleteReserva,
} from "../src/controller/reservas.controller.js";
import { validateReservation } from "../src/middlewares/reservaValidation.js";

const router = Router();

//------------------- Obtener reservas por ID -------------------//
router.get("/reservas/user/:id", getReservasPorUsuario); //
//------------------- Crear reservas -------------------//
router.post("/reservas", validateReservation, createReserva);
//------------------- Obtener todas las reservas -------------------//
router.get("/reservas", getTodasLasReservas);
//------------------- Actualizar reservas -------------------//
router.put("/reservas/:id", updateReserva);
//------------------- Eliminar reserva -------------------//
router.delete("/reservas/:id", deleteReserva);
//

export default router;
