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
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lugar_devolucion: {
      type: DataTypes.ENUM(
        `Aeropuerto de Rosario "Islas Malvinas"`,
        `Centro de Rosario - Sucursal Principal`,
        `Terminal de Ómnibus Mariano Moreno`
      ),
      allowNull: false,
      defaultValue: "Seleccione un lugar de devolucion",
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
    total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: false,
  }
);
