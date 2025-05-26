import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import "./models/Car.js";
import "./models/Review.js";
import "./models/index.js";
import carsRoutes from "../routes/cars.routes.js";
import reviewsRoutes from "../routes/review.routes.js";

const app = express();
app.use(express.json());

try {
  app.use(carsRoutes);
  app.use(reviewsRoutes);
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(`There was an error on initialization:`, error);
}
