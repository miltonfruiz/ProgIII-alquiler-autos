import { Router } from "express";
import { Pay } from "../src/models/Pay.js";
import { payValidation } from "../src/middlewares/payValidations.js";
import { Car } from "../src/models/Car.js";
import { Reserva } from "../src/models/Reserva.js";
const router = Router();

//-------------------------- Creacion de una instancia pago ----------------------------------------//

router.post("/pays", async (req, res) => {
  // cuando ande probar la validacion payValidation,
  const {
    userId,
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
  } = req.body;

  console.log("datos de entrada", req.body);

  console.log("📦 Datos a insertar:", {
    carId,
    userId,
    reservationId: id_reserva,
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
  try {
    const pay = await Pay.create({
      carId,
      userId,
      reservationId: id_reserva,
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
  } catch (error) {
    console.error("Error al crear el pago:", error);
    res.status(500).json({ error: "Error al crear el pago" });
  }

  //aqui actualizamos el estado de la reserva (Reservation model) una vez que estamos en el pago, luego del POST de pay
  try {
    await Reserva.update(
      { estado_reserva: "confirmada" },
      { where: { id_reserva: id_reserva } }
    );

    await Car.update({ estado: "no disponible" }, { where: { id: carId } });
  } catch (error) {
    console.error("Error al actualizar la reserva o el auto:", error);
  }
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

//VER DESPUES CUAL ES EL ERROR DE PORQUE NO ME INSERTA EN LA BASE DE DATOS EL PAGO CON CLAUDE
