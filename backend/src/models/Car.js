import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Car = sequelize.define(
  "Car",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            "Económico",
            "Compacto",
            "Estándar",
            "Full-size",
            "Premium",
            "SUV",
            "Pickup",
            "Minivan",
            "Deportivo",
            "Eléctrico",
          ],
        ],
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passengers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Manual", "Automática"]],
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            "Peugeot",
            "Toyota",
            "Ford",
            "Chevrolet",
            "Volkswagen",
            "Renault",
            "Nissan",
            "Honda",
            "Hyundai",
            "BMW",
            "Mercedes-Benz",
            "Audi",
            "Jeep",
            "Citroën",
            "Tesla",
          ],
        ],
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Disponible",
      validate: {
        isIn: [["Disponible", "No disponible"]],
      },
    },
  },
  {
    timestamps: false,
  }
);
