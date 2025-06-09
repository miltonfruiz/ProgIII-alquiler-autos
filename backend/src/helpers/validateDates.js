export function validateReservationDates(startDate, endDate) {
  const errores = {};

  //Validar formato fecha
  if (!isValidDate(startDate)) {
    errores.fecha_inicio = "Formato de fecha inválido";
  }

  if (!isValidDate(endDate)) {
    errores.fecha_fin = "Formato de fecha inválido";
  }

  //Si ambas son validas:
  if (isValidDate(startDate) && isValidDate(endDate)) {
    const hoy = new Date();
    const inicio = new Date(startDate);
    const fin = new Date(endDate);

    // Ignorar la hora
    hoy.setHours(0, 0, 0, 0);
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);

    if (inicio < hoy) {
      errores.fecha_inicio = "Debe ingresar una fecha posterior a hoy";
    }

    if (inicio < hoy) {
      errores.fecha_fin = "Debe ingresar una fecha posterior a hoy";
    }

    if (fin < inicio) {
      errores.fecha_fin = "La fecha final debe ser posterior a la inicial";
    }
  }

  return {
    valid: Object.keys(errores).length === 0,
    errores,
  };
}

// Función auxiliar para validar formato ISO (YYYY-MM-DD)
function isValidDate(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}
