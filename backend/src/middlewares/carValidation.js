export function carValidation(req, res, next) {
  const {
    name,
    category,
    image,
    passengers,
    transmission,
    price,
    brand,
    estado,
  } = req.body;
  const errors = {};
  if (!name) errors.name = "El nombre es obligatorio.";
  if (!category) errors.category = "La categoría es obligatoria.";
  if (!image) errors.image = "La imagen es obligatoria.";
  if (!passengers) {
    errors.passengers = "El número de pasajeros es obligatorio.";
  } else if (isNaN(passengers)) {
    errors.passengers = "El número de pasajeros debe ser un número válido.";
  }

  if (!transmission) errors.transmission = "La transmisión es obligatoria.";
  if (!price) {
    errors.price = "El precio es obligatorio.";
  } else if (isNaN(price)) {
    errors.price = "El precio debe ser un número válido.";
  }
  if (!brand) errors.brand = "La marca es obligatoria.";
  if (typeof estado === "undefined") {
    errors.estado = "El estado es obligatorio.";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}
