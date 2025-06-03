import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import "./models/Car.js";
import "./models/Review.js";
import "./models/index.js";
import "./models/User.js";
import carsRoutes from "../routes/cars.routes.js";
import reviewsRoutes from "../routes/review.routes.js";
import usersRoutes from "../routes/users.routes.js";
import adminRoutes from "../routes/admin.routes.js";

const app = express();

try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use(carsRoutes);
  app.use(reviewsRoutes);
  app.use(usersRoutes);
  app.use(adminRoutes);
  app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
  });
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(`There was an error on initialization:`, error);
}
