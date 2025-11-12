import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import "./models/index.js";
import "./models/Car.js";
import "./models/Review.js";
import "./models/User.js";
import "./models/Reserva.js";
import "./models/Pay.js";
import carsRoutes from "../routes/cars.routes.js";
import reviewsRoutes from "../routes/review.routes.js";
import usersRoutes from "../routes/users.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import reservasRoutes from "../routes/reservas.routes.js";
import payRoutes from "../routes/pay.routes.js";
import { iniciarActualizacionReservas } from "../job/updateReservations.js";

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
  app.use(reservasRoutes);
  app.use(payRoutes);
  app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
  });
  await sequelize.sync();
  // Funcion para iniciar la tarea programa de actualizacion de reservas
  iniciarActualizacionReservas();
  //await sequelize.sync({ force: true }); para borrar datos de la tabla
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(`There was an error on initialization:`, error);
}
