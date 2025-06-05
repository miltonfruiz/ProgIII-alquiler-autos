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
Reserva.hasOne(Pay, { foreignKey: "reservationId", onDelete: "CASCADE" });
Pay.belongsTo(Reserva, { foreignKey: "reservationId" });

// Un pago pertenece a un auto
Car.hasOne(Pay, { foreignKey: "carId", onDelete: "CASCADE" });
Pay.belongsTo(Car, { foreignKey: "carId" });

User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Pay, { foreignKey: "userId", onDelete: "CASCADE" });
Pay.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

User.hasMany(Car, { foreignKey: "carId", onDelete: "CASCADE" });
Car.belongsTo(User, { foreignKey: "carId", onDelete: "CASCADE" });

export { Car, Review, User, Reserva, Pay };
