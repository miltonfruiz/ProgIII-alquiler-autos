import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import "./models/Car.js";
import "./models/Review.js";
import "./models/index.js";
import "./models/User.js";
import carsRoutes from "../routes/cars.routes.js";
import reviewsRoutes from "../routes/review.routes.js";
import usersRoutes from "../routes/users.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import reservasRoutes from "../routes/reservas.routes.js";
import payRoutes from "../routes/pay.routes.js";

const app = express();

try {
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
  app.use(carsRoutes);
  app.use(reviewsRoutes);
  app.use(usersRoutes);
  app.use(adminRoutes);
  app.use(reservasRoutes);
  app.use(payRoutes);
  sequelize.sync({ force: true }).then(() => {
  console.log("Todas las tablas fueron recreadas correctamente.");
});
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(`There was an error on initialization:`, error);
}
