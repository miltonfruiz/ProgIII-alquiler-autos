import peugeot208 from "../assets/images/cars/peugeot208.png";
import toyotaCorolla from "../assets/images/cars/toyotaCorolla.png";
import peugeot408 from "../assets/images/cars/peugeot408.png";
import volksGol from "../assets/images/cars/volkswagenGol.png";
import chevroletPrisma from "../assets/images/cars/chevroletPrisma.png";
import toyotaEtios from "../assets/images/cars/toyota_etios.png";
import toyotaEtiosSedan from "../assets/images/cars/toyota_etios-sedan.png";
import fiatCronos from "../assets/images/cars/fiat-cronos.png";
import vwTcross from "../assets/images/cars/vw-t-cross.png";

const mockCars = [
  {
    id: 1,
    name: "Toyota Etios",
    category: "Económico",
    image: toyotaEtios,
    passengers: 5,
    transmission: "Manual",
    price: 59400,
    brand: "Toyota",
  },
  {
    id: 2,
    name: "Fiat Cronos",
    category: "Económico",
    image: fiatCronos,
    passengers: 5,
    transmission: "Manual",
    price: 37800,
    brand: "Fiat",
  },
  {
    id: 3,
    name: "Volkswagen T-Cross",
    category: "SUV",
    image: vwTcross,
    passengers: 5,
    transmission: "Manual",
    price: 75000,
    brand: "Volkswagen",
  },
  {
    id: 4,
    name: "Toyota Corolla",
    category: "Full Size",
    image: toyotaCorolla,
    passengers: 5,
    transmission: "Manual",
    price: 69200,
    brand: "Toyota",
  },
  {
    id: 5,
    name: "Peugeot 208",
    category: "Estándar",
    image: peugeot208,
    passengers: 5,
    transmission: "Automático",
    price: 69200,
    brand: "Peugeot",
  },
  {
    id: 6,
    name: "Volkswagen Gol",
    category: "Económico",
    image: volksGol,
    passengers: 5,
    transmission: "Manual",
    price: 52100,
    brand: "Volkswagen",
  },
  {
    id: 7,
    name: "Toyota Etios Xls",
    category: "Full Size",
    image: toyotaEtiosSedan,
    passengers: 5,
    transmission: "Automático",
    price: 88500,
    brand: "Toyota",
  },
  {
    id: 8,
    name: "Chevrolet Prisma",
    category: "Económico",
    image: chevroletPrisma,
    passengers: 5,
    transmission: "Manual",
    price: 48500,
    brand: "Chevrolet",
  },
  {
    id: 9,
    name: "Peugot 408",
    category: "Full Size",
    image: peugeot408,
    passengers: 5,
    transmission: "Manual",
    price: 73500,
    brand: "Peugeot",
  },
];

export default mockCars;
