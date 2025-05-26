import { Router } from "express";
import { Review } from "../src/models/Review.js";
import { Car } from "../src/models/Car.js";
import { reviewValidation } from "../src/middlewares/reviewValidation.js";

const router = Router();

//------------------- Crear comentario -------------------//
router.post("/reviews", reviewValidation, async (req, res) => {
  try {
    const { carId, username, rating, comment } = req.body;
    const review = await Review.create({ carId, username, rating, comment });
    const reviews = await Review.findAll({ where: { carId } });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Car.update({ rating: avgRating }, { where: { id: carId } });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario" });
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
