import { Router } from "express";
import { User } from "../src/models/User.js";

const router = Router();

//------------------- Crear usuario -------------------//
router.post("/users", async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      correo,
      contraseña,
      repetirContraseña,
      dni,
      nacimiento,
      licencia,
    } = req.body;
    const newUser = await User.create({
      nombre,
      apellido,
      correo,
      contraseña,
      repetirContraseña,
      dni,
      nacimiento,
      licencia,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//------------------- Obtener usuarios -------------------//
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});
//------------------- Obtener usuario por ID -------------------//
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});
//------------------- Eliminar usuario -------------------//
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});
export default router;
