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
import { adminValidation } from "./middlewares/adminValidation.js";

const app = express();
app.use(express.json());

try {
  app.use("/cars", carsRoutes);
  app.use("/review", reviewsRoutes);
  app.use("/users", usersRoutes);
  app.use("/admin", adminValidation, adminRoutes);

  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(`There was an error on initialization:`, error);
}
