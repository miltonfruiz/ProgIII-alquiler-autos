import { Car } from "./Car.js";
import { Review } from "./Review.js";
import { User } from "./User.js";
import { Reserva } from "./Reserva.js";
import { Pay } from "./Pay.js";

//Un auto tiene varias reservas
Car.hasMany(Review, { foreignKey: "carId", onDelete: "CASCADE" });
Review.belongsTo(Car, { foreignKey: "carId" });

//Un usuario puede tener varias reservas
User.hasMany(Reserva, { foreignKey: "userId", onDelete: "CASCADE" });
Reserva.belongsTo(User, { foreignKey: "userId" });

//Un auto tiene varias reservas
Car.hasMany(Reserva, { foreignKey: "carId", onDelete: "CASCADE" });
Reserva.belongsTo(Car, { foreignKey: "carId" });

// Un pago pertenece a una reserva
Reserva.hasOne(Pay, { foreignKey: "id_reserva", onDelete: "CASCADE" });
Pay.belongsTo(Reserva, { foreignKey: "id_reserva" });

// Un pago pertenece a un auto
Car.hasOne(Pay, { foreignKey: "carId", onDelete: "CASCADE" });
Pay.belongsTo(Car, { foreignKey: "carId" });

User.hasMany(Pay, { foreignKey: "userId", onDelete: "CASCADE" });
Pay.belongsTo(Car, { foreignKey: "userId" });

User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

// Cada reserva pertenece a un usuario y a un auto
Reserva.belongsTo(User, { foreignKey: "userId" });
Reserva.belongsTo(Car, { foreignKey: "carId" });

export { Car, Review, User, Reserva, Pay };
