import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repetirContraseña: {
      type: DataTypes.VIRTUAL,
      validate: {
        equalsPassword(value) {
          if (value !== this.contraseña) {
            throw new Error("Las contraseñas no coinciden");
          }
        },
      },
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    licencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeroTelefonico: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]{10}$/, // Validación para un número telefónico de 10 dígitos
      },
    },
    /*
    rol: {
      type: DataTypes.ENUM("administrador", "empleado", "usuario"),
      allowNull: false,
      defaultValue: "usuario",
    },
     */
  },
  {
    timestamps: false,
  }
);
