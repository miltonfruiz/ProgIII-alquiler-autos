// src/data/mockRecomendados.js
import peugeot208 from "../assets/images/cars/peugeot208.png";
import toyotaCorolla from "../assets/images/cars/toyotaCorolla.png";
import toyotaEtios from "../assets/images/cars/toyota_etios.png";
import fiatCronos from "../assets/images/cars/fiat-cronos.png";
import vwTcross from "../assets/images/cars/vw-t-cross.png";

const mockRecomendados = [
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
];

export default mockRecomendados;
