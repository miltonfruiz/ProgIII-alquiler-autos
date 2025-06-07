import { Router } from "express";
import {
  getReservasPorUsuario,
  createReserva,
} from "../src/controller/reservas.controller.js";
import { validateReservation } from "../src/middlewares/reservaValidation.js";

const router = Router();

//------------------- Obtener reservas -------------------//
router.get("/reservas/user/:id", getReservasPorUsuario); //
//------------------- Actualizar reservas -------------------//
router.post("/reservas", validateReservation, createReserva);

export default router;
