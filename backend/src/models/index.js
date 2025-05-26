import { Car } from "./Car.js";
import { Review } from "./Review.js";

Car.hasMany(Review, { foreignKey: "carId", onDelete: "CASCADE" });
Review.belongsTo(Car, { foreignKey: "carId" });

export { Car, Review };
