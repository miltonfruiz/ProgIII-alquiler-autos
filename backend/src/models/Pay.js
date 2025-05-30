import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Pay = sequelize.define("Pay", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    // creo que el id de la reserva no iria ya que la reserva se crea cuando se efectua el pago. en todo caso colocar los dias de reserva del auto aca
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Reservation",
      key: "id",
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
  acceptableTerms: DataTypes.BOOLEAN, // este es el checkbox de acepto terminos y condiciones
  allowNull: false,
  default: false,
});
