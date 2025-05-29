import { Router } from "express";
import { Pay } from "../src/models/Pay.js";
import { payValidation } from "../src/middlewares";

const router = Router();

//-------------------------- Creacion de una instancia pago ----------------------------------------//

router.post("/pays", payValidation, async (req, res) => {
  try {
    const {
      userId,
      carId,
      reservationId,
      price,
      dias_totales,
      tax,
      cardType,
      paymentMethod,
      cardNumber,
      expirationDate,
      ownerName,
      cvc,
      voucher,
      acceptableTerms,
    } = req.body;

    const subtotal = price * dias_totales;

    const total = tax + subtotal;

    if (paymentMethod == "tarjeta") {
      const pay = await Pay.create({
        userId,
        carId,
        reservationId,
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
        reservationId,
        subtotal,
        total,
        tax,
        cardType,
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

// creo que irian esas dos rutas nomas. por ahora no se me ocurre otra
