import express from "express";
import { PORT, sequelize } from "./config.js";
import carsRoutes from "../routes/cars.routes.js";
import { Car } from "./models/Car.js";
const app = express();

app.use(express.json());
app.use("/api", carsRoutes);
async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log("Base de datos conectada y sincronizada!");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}...`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}
startServer();
