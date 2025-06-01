const CardAdminValidation = (car) => {
  const errors = {};

  if (!car.name || car.name.trim().length < 2) {
    errors.name = "* Debe ingresar nombre";
  }
  if (!car.category || car.category.trim() === "") {
    errors.category = "* Debes seleccionar categoría.";
  }
  if (!car.image) {
    errors.image = "* Debe ingresar imagen";
  }
  if (!car.passengers || isNaN(car.passengers) || Number(car.passengers) <= 0) {
    errors.passengers = "* Debe ingresar un número válido";
  }
  if (!car.transmission || car.transmission.trim() === "") {
    errors.transmission = "* Debes seleccionar transmisión.";
  }
  if (!car.price || isNaN(car.price) || Number(car.price) <= 0) {
    errors.price = "* Debe ingresar un número válido";
  }
  if (!car.brand || car.brand.trim() === "") {
    errors.brand = "* Debes seleccionar marca.";
  }
  if (!car.estado || car.estado.trim() === "") {
    errors.estado = "* Debes seleccionar estado.";
  }
  return errors;
};

export default CardAdminValidation;
