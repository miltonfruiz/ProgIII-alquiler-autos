import { Router } from "express";
const router = Router();

router.get("/cars", (req, res) => {
  res.send("Obteniendo todos los autos");
});

router.get("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo auto con id: ${id}`);
});

router.post("/cars", (req, res) => {
  const newCar = req.body;
  res.send(`Creando un nuevo auto: ${JSON.stringify(newCar)}`);
});

router.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  const updatedCar = req.body;
  res.send(`Actualizando auto con id ${id}: ${JSON.stringify(updatedCar)}`);
});

router.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando auto con id: ${id}`);
});

export default router;
