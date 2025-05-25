import { Router } from "express";
import { Car } from "../src/models/Car.js";

const router = Router();

//------------------- Obtener todos los autos -------------------//
router.get("/cars", (req, res) => {
  res.send("Obteniendo libros");
});
//------------------- Obtener un auto por ID -------------------//
router.get("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo libro con id ${id}`);
});
//------------------- Crear un auto nuevo -------------------//
router.post("/cars", (req, res) => {
  res.send("Creando libro");
});
//------------------- Actualizar un auto -------------------//
router.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando libro con id ${id}`);
});
//------------------- Eliminar un auto -------------------//
router.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando libro con id ${id}`);
});
export default router;
