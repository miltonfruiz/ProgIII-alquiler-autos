import { Router } from "express";
import { User } from "../src/models/User.js";
import { userValidation } from "../src/middlewares/userValidation.js";

const router = Router();

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
//------------------- Crear usuario -------------------//
router.post("/users", userValidation, async (req, res) => {
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
      numeroTelefonico,
    } = req.body;
    const existeDNI = await User.findOne({ where: { dni } });
    if (existeDNI) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con ese DNI" });
    }

    const existeCorreo = await User.findOne({ where: { correo } });
    if (existeCorreo) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con ese correo" });
    }
    const newUser = await User.create({
      nombre,
      apellido,
      correo,
      contraseña,
      dni,
      nacimiento,
      licencia,
      numeroTelefonico,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    // Depuración múltiples errores
    if (error.errors) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: messages.join(", ") });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});
//------------------- Actualizar usuario -------------------//
router.put("/users/:id", userValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      correo,
      contraseña,
      dni,
      nacimiento,
      licencia,
      numeroTelefonico,
    } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const existingCorreo = await User.findOne({
      where: { correo },
    });
    if (existingCorreo && existingCorreo.id !== Number(id)) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }
    const existingDni = await User.findOne({
      where: { dni },
    });
    if (existingDni && existingDni.id !== Number(id)) {
      return res.status(400).json({ error: "El DNI ya está en uso" });
    }
    await user.update({
      nombre,
      apellido,
      correo,
      contraseña,
      dni,
      nacimiento,
      licencia,
      numeroTelefonico,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(400).json({ error: error.message });
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
