import { Car } from "./Car.js";
import { Review } from "./Review.js";
import { User } from "./User.js";
import { Pay } from "./Pay.js";

Car.hasMany(Review, { foreignKey: "carId", onDelete: "CASCADE" });
Review.belongsTo(Car, { foreignKey: "carId" });

User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Pay, { foreignKey: "userId", onDelete: "CASCADE" });
Pay.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

User.hasMany(Car, { foreignKey: "carId", onDelete: "CASCADE" });
User.belongsTo(User, { foreignKey: "carId", onDelete: "CASCADE" });

export { Car, Review, User };
