import { Router } from "express";
import { Review } from "../src/models/Review.js";
import { Car } from "../src/models/Car.js";
import { reviewValidation } from "../src/middlewares/reviewValidation.js";

const router = Router();

//------------------- Crear comentario -------------------//
router.post("/reviews", reviewValidation, async (req, res) => {
  try {
    console.log("📩 Datos recibidos:", req.body);
    const { carId, userId, username, rating, comment } = req.body;

    // Solo validar que el auto existe
    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({
        error: "El auto especificado no existe",
      });
    }

    // Verificar reviews duplicadas
    const existingReview = await Review.findOne({
      where: { carId, userId },
    });

    if (existingReview) {
      return res.status(400).json({
        error: "Ya has calificado este auto anteriormente",
      });
    }

    // Crear la review
    const review = await Review.create({
      carId,
      userId,
      username,
      rating,
      comment,
    });

    // Actualizar rating promedio
    const reviews = await Review.findAll({ where: { carId } });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Car.update(
      { rating: avgRating.toFixed(2) },
      { where: { id: carId } }
    );

    res.status(201).json({
      message: "Review creada exitosamente",
      review,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      error: "Error al crear el comentario",
      details: error.message,
    });
  }
});
//------------------- Obtener comentarios -------------------//
router.get("/reviews/car/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const reviews = await Review.findAll({ where: { carId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentario" });
  }
});
//------------------- Eliminar comentario -------------------//
router.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.destroy({ where: { id } });
    if (deleted) return res.sendStatus(204);
    res.status(404).json({ error: "Comentario no encontrada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
});
export default router;
