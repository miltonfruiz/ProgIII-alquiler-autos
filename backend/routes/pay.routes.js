import { Router } from "express";
import { Pay } from "../src/models/Pay.js";
import { payValidation } from "../src/middlewares/payValidations.js";
import { Car } from "../src/models/Car.js";
import { Reserva } from "../src/models/Reserva.js";
const router = Router();

//-------------------------- Creacion de una instancia pago ----------------------------------------//

router.post("/pays/:carId/:id_reserva", async (req, res) => {
  const { carId } = req.params;
  const { id_reserva } = req.params;

  const {
    cardType,
    paymentMethod,
    cardNumber,
    expirationDate,
    ownerName,
    cvc,
    voucher,
    acceptableTerms,
  } = req.body;

  console.log(req.body);

  const { price } = await Car.findOne({ where: { id: carId } });

  if (!price) {
    return res.status(404).json({ error: "precio no encontrado" });
  } else {
    console.log("precio", price);
  }

  const reserva = await Reserva.findOne({
    where: { id_reserva: id_reserva },
  });

  const cant_dias = reserva.cant_dias;

  console.log(cant_dias);

  if (!cant_dias) {
    return res.status(404).json({ error: "dias totales no encontrados" });
  } else {
    console.log("dias totales", cant_dias);
  }

  console.log(cardType);

  const tax = price * 0.21 * cant_dias;

  console.log("tax", tax);

  const subtotal = price * cant_dias;

  console.log("subtotal", subtotal);

  const total = tax + subtotal;

  console.log("total", total);

  //aqui actualizamos el estado de la reserva (Reservation model) una vez que estamos en el pago, luego del POST de pay

  await Reserva.update(
    { estado_reserva: "confirmada" },
    { where: { id_reserva: id_reserva } }
  );

  const pay = await Pay.create({
    carId,
    id_reserva,
    subtotal,
    tax,
    total,
    cardType,
    paymentMethod,
    cardNumber,
    expirationDate,
    ownerName,
    cvc,
    voucher,
    acceptableTerms,
  });
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
