export function carValidation(req, res, next) {
  const {
    name,
    category,
    image,
    passengers,
    transmission,
    price,
    brand,
    date,
    tax,
    paymentMethod,
    billing,
    total,
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
  if (!date) errors.date = "La fecha es obligatoria.";
  if (!tax) {
    errors.tax = "El impuesto es obligatorio.";
  } else if (isNaN(tax)) {
    errors.tax = "El impuesto debe ser un número válido.";
  }
  if (!paymentMethod)
    errors.paymentMethod = "El método de pago es obligatorio.";
  if (!billing) errors.billing = "El tipo de facturación es obligatorio.";
  if (!total) {
    errors.total = "El total es obligatorio.";
  } else if (isNaN(total)) {
    errors.total = "El total debe ser un número válido.";
  }
  if (typeof estado === "undefined") {
    errors.estado = "El estado es obligatorio.";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}
