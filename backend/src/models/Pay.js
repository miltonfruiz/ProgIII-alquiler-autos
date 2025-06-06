import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Car } from "./Car.js";
import { Reserva } from "./Reserva.js";

export const Pay = sequelize.define("Pay", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Car",
      key: "id",
    },
  },
  reservationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Reserva",
      key: "id_reserva",
    },
  },
  subtotal: {
    // esto es el precio del auto por dia multiplicado a los dias que se alquila osea (price de Car) * (dias_totales de Reservas)
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tax: {
    // serian los impuestos
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total: {
    // esto es el subtotal + el tax
    type: DataTypes.FLOAT,
    allowNull: false,
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
});
