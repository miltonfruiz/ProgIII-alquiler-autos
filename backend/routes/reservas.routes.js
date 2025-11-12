import { Router } from "express";
import {
  getReservasPorUsuario,
  createReserva,
  getTodasLasReservas,
  updateReserva,
  deleteReserva,
  getPastReservationsByUser,
} from "../src/controller/reservas.controller.js";
import { validateReservation } from "../src/middlewares/reservaValidation.js";

const router = Router();
//------------------- Crear reservas -------------------//
router.post("/reservas", validateReservation, createReserva);
//------------------- Obtener todas las reservas -------------------//
router.get("/reservas", getTodasLasReservas);
//------------------- Obtener reservas por ID -------------------//
router.get("/reservas/user/:id", getReservasPorUsuario); //
//------------------ Obtener reservas pasadas por usuario ------------------//
router.get("/reservas/past/user/:id", getPastReservationsByUser);
//------------------- Actualizar reservas -------------------//
router.put("/reservas/:id", updateReserva);
//------------------- Eliminar reserva -------------------//
router.delete("/reservas/:id", deleteReserva);

export default router;
