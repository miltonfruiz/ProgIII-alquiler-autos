import { Router } from "express";
import { Pay } from "../src/models/Pay.js";
import { Car } from "../src/models/Car.js";
import { Reserva } from "../src/models/Reserva.js";
const router = Router();

//-------------------------- Creacion de una instancia pago ----------------------------------------//

router.post("/pays", async (req, res) => {
  const { userId } = req.params;
  const { carId } = req.params;
  const { id_reserva } = req.params;

  const { price } = await Car.findOne({ where: { id: carId } });

  if (!price) {
    console.log(res.status(404).json({ error: "precio no encontrado" }));
  } else {
    console.log("precio", price);
  }

  const { dias_totales } = await Reservation.findOne({
    where: { id: id_reserva },
  });

  if (!dias_totales) {
    console.log(res.status(404).json({ error: "dias totales no encontrados" }));
  } else {
    console.log("dias totales", dias_totales);
  }

  try {
    console.log("req.body", req.body);
    try {
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
    } catch (error) {
      console.log(res.status(400).json({ error: "Faltan datos de pago" }));
    }

    const tax = price * 0.21 * dias_totales;

    console.log("tax", tax);

    const subtotal = price * dias_totales;

    console.log("subtotal", subtotal);

    const total = tax + subtotal;

    console.log("total", total);

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
      console.log(res.status(201).json(pay));
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
    console.log(
      res.status(500).json({ error: "Error al crear el comentario" })
    );
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
