import { Router } from "express";
import { Car } from "../src/models/Car.js";

const router = Router();

//------------------- Obtener todos los autos -------------------//
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autos", error });
  }
});
//------------------- Obtener un auto por ID -------------------//
router.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: "Auto no encontrado" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar auto", error });
  }
});
//------------------- Crear un auto nuevo -------------------//
router.post("/cars", async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: "Error al crear auto", error });
  }
});
//------------------- Actualizar un auto -------------------//
router.put("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: "Auto no encontrado" });

    await car.update(req.body);
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar auto", error });
  }
});
//------------------- Eliminar un auto -------------------//
router.delete("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: "Auto no encontrado" });

    await car.destroy();
    res.json({ message: "Auto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar auto", error });
  }
});
export default router;
