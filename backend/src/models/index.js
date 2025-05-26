import { Car } from "./Car.js";
import { Review } from "./Review.js";
import { User } from "./User.js";

Car.hasMany(Review, { foreignKey: "carId", onDelete: "CASCADE" });
Review.belongsTo(Car, { foreignKey: "carId" });

User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

export { Car, Review, User };
