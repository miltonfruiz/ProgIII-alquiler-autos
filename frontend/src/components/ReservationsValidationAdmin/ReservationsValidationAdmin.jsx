export const ReservationsValidationAdmin = (data) => {
  const errors = {};

  if (!data.userId || data.userId === "") {
    errors.userId = "Debe seleccionar un usuario";
  }
  if (!data.carId || data.carId === "") {
    errors.carId = "* Debe seleccionar un auto";
  }
  if (!data.fecha_inicio) {
    errors.fecha_inicio = "* Debe ingresar una fecha de inicio";
  }
  if (!data.fecha_fin) {
    errors.fecha_fin = "* Debe ingresar una fecha de fin";
  }
  if (data.fecha_inicio && data.fecha_fin) {
    const inicio = new Date(data.fecha_inicio);
    const fin = new Date(data.fecha_fin);
    if (fin <= inicio) {
      errors.fecha_fin = "* La fecha de fin debe ser posterior a la de inicio";
    }
  }
  return errors;
};
