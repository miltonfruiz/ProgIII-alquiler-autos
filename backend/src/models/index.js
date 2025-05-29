import { Car } from "./Car.js";
import { Review } from "./Review.js";
import { User } from "./User.js";
import { Reserva } from "./Reserva.js";

//Un auto tiene varias reservas
Car.hasMany(Review, { foreignKey: "carId", onDelete: "CASCADE" });
Review.belongsTo(Car, { foreignKey: "carId" });

//Un usuario puede tener varias reservas
User.hasMany(Reserva, { foreignKey: "userId", onDelete: "CASCADE" });
Reserva.belongsTo(User, { foreignKey: "userId" });

//Un auto tiene varias reservas
Car.hasMany(Reserva, { foreignKey: "carId", onDelete: "CASCADE" });
Reserva.belongsTo(Car, { foreignKey: "carId" });

//Un pago pertenece a una reserva
// Pago.hasOne(Reserva, { foreignKey: "pagoId", onDelete:"CASCADE" })
// Reserva.belongsTo(Pago, { foreignKey: "pagoId" });

export { Car, Review, User, Reserva };
