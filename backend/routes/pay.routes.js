import { Router } from "express";
import { Pay } from "../src/models/Pay.js";
import { payValidation } from "../src/middlewares/payValidations.js";
import { Car } from "../src/models/Car.js";
import { Reserva } from "../src/models/Reserva.js";
const router = Router();

//-------------------------- Creacion de una instancia pago ----------------------------------------//

router.post("/pays", payValidation, async (req, res) => {
  const {
    userId,
    id_reserva,
    cardType,
    paymentMethod,
    cardNumber,
    expirationDate,
    ownerName,
    cvc,
    voucher,
    acceptableTerms,
  } = req.body;

  console.log("datos de entrada", req.body);

  const pay = await Pay.create({
    userId,
    id_reserva,
    cardType,
    paymentMethod,
    cardNumber,
    expirationDate,
    ownerName,
    cvc,
    voucher,
    acceptableTerms,
  });

  //aqui actualizamos el estado de la reserva (Reservation model) una vez que estamos en el pago, luego del POST de pay

  await Reserva.update(
    { estado_reserva: "confirmada" },
    { where: { id_reserva: id_reserva } }
  );

  await Car.update({ estado: "no disponible" }, { where: { id: carId } });

  res.status(201).json(pay);
});

//-------------------------- obtener pagos de una persona------------------

/* router.get("/pays/user:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const pays = await Pay.findById(userId);
    res.json(pays);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pagos de la persona" });
  }
});*/

export default router;
