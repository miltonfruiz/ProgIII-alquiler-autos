import { Router } from "express";
import { Car } from "../src/models/Car.js";

const router = Router();

//------------------- Obtener todos los autos -------------------//
router.get("/cars", (req, res) => {
  res.send("Obteniendo auto");
});
//------------------- Obtener un auto por ID -------------------//
router.get("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo auto con id ${id}`);
});
//------------------- Crear un auto nuevo -------------------//
router.post("/cars", (req, res) => {
  res.send("Creando auto");
});
//------------------- Actualizar un auto -------------------//
router.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando auto con id ${id}`);
});
//------------------- Eliminar un auto -------------------//
router.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando auto con id ${id}`);
});
export default router;
