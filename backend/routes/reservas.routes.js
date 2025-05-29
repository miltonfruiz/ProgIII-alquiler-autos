import { Router } from "express";
import { createReserva } from "../controllers/reservas.controller.js";
import { validateReservation } from "../middlewares/validateReservation.js";

const router = express.Router();

router.post("/reservas", validateReservation, createReserva);

export default router;
