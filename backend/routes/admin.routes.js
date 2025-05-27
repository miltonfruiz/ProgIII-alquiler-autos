import { Router } from "express";
import { Car } from "../src/models/Car.js";
import { User } from "../src/models/User.js";
import { adminValidation } from "../src/middlewares/adminValidation.js";
const router = Router();

//------------------- CARS -------------------//
//------------------- Obtener autos -------------------//
router.get("/admin/cars", adminValidation, async (req, res) => {
  const cars = await Car.findAll();
  res.json(cars);
});
//------------------- Crear autos -------------------//
router.post("/admin/cars", adminValidation, async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//------------------- Editar autos -------------------//
router.put("/admin/cars/:id", adminValidation, async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ error: "Auto no encontrado" });
    await car.update(req.body);
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//------------------- Eliminar autos -------------------//
router.delete("/admin/cars/:id", adminValidation, async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ error: "Auto no encontrado" });
    await car.destroy();
    res.json({ message: "Auto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//------------------- USERS -------------------//
//------------------- Obtener usuarios -------------------//
router.get("/admin/users", adminValidation, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
//------------------- Crear usuario -------------------//
router.post("/admin/users", adminValidation, async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//------------------- Editar usuario -------------------//
router.put("/admin/users/:id", adminValidation, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//------------------- Eliminar usuario -------------------//
router.delete("/admin/users/:id", adminValidation, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
