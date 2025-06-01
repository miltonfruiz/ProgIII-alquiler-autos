export function carValidation(req, res, next) {
  const { name, category, passengers, transmission, price, brand, estado } =
    req.body;
  const errors = {};
  const isEmpty = (value) =>
    value === undefined || value === null || value.toString().trim() === "";
  if (isEmpty(name)) {
    errors.name = "El nombre es obligatorio.";
  } else if (name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  }
  if (isEmpty(category)) {
    errors.category = "La categoría es obligatoria.";
  }
  if (!req.file) {
    errors.image = "La imagen es obligatoria.";
  }
  if (isEmpty(passengers)) {
    errors.passengers = "El número de pasajeros es obligatorio.";
  } else if (isNaN(passengers) || Number(passengers) <= 0) {
    errors.passengers = "Debe ser un número válido y mayor que cero.";
  }
  const validTransmissions = ["manual", "automática", "automatico", "manual"];
  if (isEmpty(transmission)) {
    errors.transmission = "La transmisión es obligatoria.";
  } else if (!validTransmissions.includes(transmission.toLowerCase())) {
    errors.transmission = "Transmisión no válida.";
  }
  if (isEmpty(price)) {
    errors.price = "El precio es obligatorio.";
  } else if (isNaN(price) || Number(price) <= 0) {
    errors.price = "El precio debe ser un número mayor que cero.";
  }
  if (isEmpty(brand)) {
    errors.brand = "La marca es obligatoria.";
  } else if (brand.length < 2) {
    errors.brand = "La marca debe tener al menos 2 caracteres.";
  }
  if (typeof estado === "undefined" || estado === null) {
    errors.estado = "El estado es obligatorio.";
  } else if (estado !== "Disponible" && estado !== "No Disponible") {
    errors.estado = "El estado debe ser 'Disponible' o 'No Disponible'.";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}
