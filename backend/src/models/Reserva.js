import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Reserva = sequelize.define(
  "Reerva",
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
    precio_final: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
