import { Router } from "express";
import { Pay } from "../src/models/Pay.js";
import { Car } from "../src/models/Car.js";
import { Reserva } from "../src/models/Reserva.js";
const router = Router();

//-------------------------- Creacion de una instancia pago ----------------------------------------//

router.post("/pays", async (req, res) => {
  try {
    const { userId } = req.params;
    const { carId } = req.params;
    const { id_reserva } = req.params;

    const { price } = await Car.findOne({ where: { id: carId } });
    const { dias_totales } = await Reservation.findOne({
      where: { id: id_reserva },
    });

    if (!userId || !carId || !id_reserva) {
      return res.status(400).json({ error: "no se encontraron los id" });
    }

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

    console.log();

    const tax = price * 0.21 * dias_totales;

    const subtotal = price * dias_totales;

    const total = tax + subtotal;

    //aqui actualizamos el estado de la reserva (Reservation model) una vez que estamos en el pago, luego del POST de pay
    await Reserva.update(
      { estado_reserva: "confirmada" },
      { where: { id_reserva: id_reserva } }
    );

    if (paymentMethod == "tarjeta") {
      const pay = await Pay.create({
        userId,
        carId,
        id_reserva,
        subtotal,
        total,
        tax,
        cardType,
        paymentMethod,
        cardNumber,
        expirationDate,
        ownerName,
        cvc,
        acceptableTerms,
      });
      res.status(201).json(pay);
    } else if (paymentMethod == "transferencia") {
      const pay = await Pay.create({
        userId,
        carId,
        id_reserva,
        subtotal,
        total,
        tax,
        paymentMethod,
        voucher,
        acceptableTerms,
      });
      res.status(201).json(pay);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario" });
  }
});

//-------------------------- obtener pagos de una persona------------------

router.get("/pays/user:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const pays = await Pay.findById(userId);
    res.json(pays);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pagos de la persona" });
  }
});

export default router;
