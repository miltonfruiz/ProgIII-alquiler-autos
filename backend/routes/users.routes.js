import { Router } from "express";
import { User } from "../src/models/User.js";
import { userValidation } from "../src/middlewares/userValidation.js";
import { userPartialValidation } from "../src/middlewares/userPartialValidation.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

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

    // Validar que las contraseñas coincidan
    if (contraseña !== repetirContraseña) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

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

    // Encriptacion de la contraseña
    const saltRounds = 10;
    const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

    const newUser = await User.create({
      nombre,
      apellido,
      correo,
      contraseña: contraseñaEncriptada,
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
router.put("/users/:id", userPartialValidation, async (req, res) => {
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
//------------------- Recuperar Contraseña -------------------//
router.post("/password-recovery", async (req, res) => {
  const { correo } = req.body;
  if (!correo) return res.status(400).json({ error: "Email requerido" });
  const user = await User.findOne({ where: { correo } });
  if (!user) {
    return res.status(404).json({ error: "Ese usuario no está registrado" });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "miltonfruizok@gmail.com",
      pass: "ihbeffqueeqqtftp",
    },
  });
  const mailOptions = {
    from: '"RentCars Web" <no-reply@rentcars.com>',
    to: correo,
    subject: "Recuperación de contraseña",
    html: `<p>Hola ${user.nombre},</p><p>Haz clic <a href="http://localhost:5173/reset-password">aquí</a> para restablecer tu contraseña.</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Instrucciones enviadas por correo" });
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});
//------------------- Restablecer Contraseña -------------------//
router.post("/reset-password", async (req, res) => {
  const { correo, nuevaContraseña, repetirContraseña } = req.body;

  if (!correo || !nuevaContraseña || !repetirContraseña) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (nuevaContraseña !== repetirContraseña) {
    return res.status(400).json({ error: "Las contraseñas no coinciden" });
  }

  const user = await User.findOne({ where: { correo } });

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // Encriptacion de la nueva contraseña
  try {
    // Encriptar la nueva contraseña antes de guardarla
    const saltRounds = 10;
    const contraseñaEncriptada = await bcrypt.hash(nuevaContraseña, saltRounds);

    await user.update({ contraseña: contraseñaEncriptada });

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
});

// ------------------- LOGIN ------------------- //
router.post("/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ error: "Correo y contraseña requeridos" });
    }

    const user = await User.findOne({ where: { correo } });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
