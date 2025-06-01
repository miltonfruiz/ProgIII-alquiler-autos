import { Router } from "express";
import { createReserva } from "../src/controller/reservas.controller.js"
import { validateReservation } from "../src/middlewares/reservaValidation.js"

const router = express.Router();

router.post("/reservas", validateReservation, createReserva);

export default router;
 