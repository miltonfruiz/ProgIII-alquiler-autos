import express from "express";
import { PORT } from "./config.js";
import carsRoutes from "../routes/cars.routes.js";

const app = express();

app.listen(PORT);
app.use(carsRoutes);
console.log(`Server listening on port ${PORT}`);
