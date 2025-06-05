import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Car } from "../src/models/Car.js";
import { carValidation } from "../src/middlewares/carValidation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

//------------------- Configuración del almacenamiento -------------------//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
//------------------- Obtener autos -------------------//
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autos", error });
  }
});
//------------------- Obtener auto por ID -------------------//
router.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: "Auto no encontrado" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar auto", error });
  }
});
//------------------- Crear auto -------------------//
router.post(
  "/cars",
  upload.single("image"),
  carValidation,
  async (req, res) => {
    try {
      const { name, category, passengers, transmission, price, brand, estado } =
        req.body;

      const image = req.file ? `/uploads/${req.file.filename}` : null;

      const car = await Car.create({
        name,
        category,
        passengers,
        transmission,
        price,
        brand,
        estado,
        image,
      });
      console.log("Imagen recibida:", req.file?.originalname);
      res.status(201).json(car);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error al crear auto", error: err });
    }
  }
);
//------------------- Actualizar auto -------------------//
router.put(
  "/cars/:id",
  upload.single("image"),
  carValidation,
  async (req, res) => {
    try {
      const car = await Car.findByPk(req.params.id);
      if (!car) return res.status(404).json({ message: "Auto no encontrado" });

      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`;
      }

      await car.update(req.body);
      res.json(car);
    } catch (error) {
      res.status(400).json({ message: "Error al actualizar auto", error });
    }
  }
);

//------------------- Eliminar auto -------------------//
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
