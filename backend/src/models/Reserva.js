import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Reserva = sequelize.define(
  "Reserva",
  {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado_reserva: {
      type: DataTypes.ENUM(
        "pendiente",
        "confirmada",
        "cancelada",
        "finalizada"
      ),
      allowNull: false,
      defaultValue: "pendiente",
    },
    fecha_reserva: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cant_dias: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
