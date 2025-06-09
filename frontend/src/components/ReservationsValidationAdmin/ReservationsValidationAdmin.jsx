export const ReservationsValidationAdmin = (data) => {
  const errors = {};

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Ignora hora

  if (!data.userId || data.userId === "") {
    errors.userId = "Debe seleccionar un usuario";
  }

  if (!data.carId || data.carId === "") {
    errors.carId = "* Debe seleccionar un auto";
  }

  if (!data.fecha_inicio) {
    errors.fecha_inicio = "* Debe ingresar una fecha de inicio";
  } else {
    const inicio = new Date(data.fecha_inicio);
    inicio.setHours(0, 0, 0, 0);
    if (inicio < hoy) {
      errors.fecha_inicio = "* Debe ingresar una fecha posterior a hoy";
    }
  }

  if (!data.fecha_fin) {
    errors.fecha_fin = "* Debe ingresar una fecha de fin";
  } else {
    const fin = new Date(data.fecha_fin);
    fin.setHours(0, 0, 0, 0);
    if (fin < hoy) {
      errors.fecha_fin = "* Debe ingresar una fecha posterior a hoy";
    }
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
