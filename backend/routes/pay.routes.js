import { Router } from "express";
import { Pay } from "../src/models/Pay.js";
import { Car } from "../src/models/Car.js";
import { Reserva } from "../src/models/Reserva.js";
import { User } from "../src/models/User.js";
const router = Router();

//-------------------------- Creacion de una instancia pago ----------------------------------------//

router.post("/pays", async (req, res) => {
  try {
    console.log("req.body", req.body);

    const {
      payId,
      cardType,
      paymentMethod,
      cardNumber,
      expirationDate,
      ownerName,
      cvc,
      voucher,
      acceptableTerms,
    } = req.body;

    const pago = await Pay.findOne({
      where: { id: payId },
      include: [
        { model: Car, attributes: ["id", "price"] },
        { model: Reserva, attributes: ["id_reserva", "dias_totales"] },
        { model: User, attributes: ["id"] },
      ],
    }); // buscamos el pago por su id incluidos otros datos de la reserva, auto y usuario

    console.log("pago", pago);

    const id_reserva = pago.Reserva.id_reserva; // para que al crear el pago, se guarde el id de la reserva

    const carId = pago.Car.id; // para que al crear el pago, se guarde el id del auto

    const userId = pago.User.id; // para que al crear el pago, se guarde el id del usuario

    const price = pago.Car.price;

    const dias_totales = pago.Reserva.dias_totales;

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
        payId,
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
