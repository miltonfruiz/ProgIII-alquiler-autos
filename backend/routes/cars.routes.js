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
    cb(null, path.join(__dirname, "../src/uploads")); // apunta a /backend/src/uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
//------------------- Buscar autos -------------------//
router.get("/cars/search", async (req, res) => {
  try {
    const { q } = req.query; // query de búsqueda

    if (!q || q.trim().length < 3) {
      return res.json([]);
    }

    const { Op } = require("sequelize");

    const cars = await Car.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { category: { [Op.iLike]: `%${q}%` } },
          { brand: { [Op.iLike]: `%${q}%` } },
        ],
      },
      limit: 3, // limitar resultados de búsqueda
    });

    res.json(cars);
  } catch (error) {
    console.error("Error en búsqueda:", error);
    res.status(500).json({ message: "Error al buscar autos", error });
  }
});
//------------------- Obtener autos -------------------//
router.get("/cars", async (req, res) => {
  try {
    const { page = 1, limit = 20, category, brand } = req.query;

    const pagNum = parseInt(page);
    const limitNum = parseInt(limit);

    const where = {};
    if (category) where.category = category;
    if (brand) where.brand = brand;

    const { count, rows } = await Car.findAndCountAll({
      where,
      limit: limitNum,
      offset: (pagNum - 1) * limitNum,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      autos: rows,
      pagination: {
        currentPage: pagNum,
        totalPages: totalPages,
        totalItems: count,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error al hacer Car.findAndCountAll():", error.message);
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

      const image = `/uploads/${req.file.filename}`;

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

//------------------- Traer autos para admin -------------------//
router.get("/cars/admin/all", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autos", error });
  }
});
