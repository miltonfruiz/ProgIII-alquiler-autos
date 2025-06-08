import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Car } from "./Car.js";
import { Reserva } from "./Reserva.js";

export const Pay = sequelize.define(
  "Pay",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM("transferencia", "tarjeta"),
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voucher: {
      type: DataTypes.STRING, // guardamos la ruta del archivo
      allowNull: true,
    },
    //Arreglo terminos, estaba mal la sintaxis (juan)
    acceptableTerms: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);
