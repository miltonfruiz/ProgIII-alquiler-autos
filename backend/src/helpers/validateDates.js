// export function validateReservationDates(startDate, endDate) {
//   const errores = {};

//   //Validar formato fecha
//   if (!isValidDate(startDate)) {
//     errores.fecha_inicio = "Formato de fecha inválido";
//   }

//   if (!isValidDate(endDate)) {
//     errores.fecha_fin = "Formato de fecha inválido";
//   }

//   //Si ambas son validas:
//   if (isValidDate(startDate) && isValidDate(endDate)) {
//     const hoy = new Date();
//     const inicio = new Date(startDate);
//     const fin = new Date(endDate);

//     // Ignorar la hora
//     hoy.setHours(0, 0, 0, 0);
//     inicio.setHours(0, 0, 0, 0);
//     fin.setHours(0, 0, 0, 0);

//     if (inicio < hoy) {
//       errores.fecha_inicio = "Debe ingresar una fecha posterior a hoy";
//     }

//     if (inicio < hoy) {
//       errores.fecha_fin = "Debe ingresar una fecha posterior a hoy";
//     }

//     if (fin < inicio) {
//       errores.fecha_fin = "La fecha final debe ser posterior a la inicial";
//     }
//   }

//   return {
//     valid: Object.keys(errores).length === 0,
//     errores,
//   };
// }

// // Función auxiliar para validar formato ISO (YYYY-MM-DD)
// function isValidDate(dateStr) {
//   const regex = /^\d{4}-\d{2}-\d{2}$/;
//   if (!regex.test(dateStr)) return false;

//   const date = new Date(dateStr);
//   return !isNaN(date.getTime());
// }

// helpers/validateDates.js
export function validateReservationDates(
  fecha_inicio,
  fecha_fin,
  hora_inicio,
  hora_fin
) {
  const errores = {};

  const hoy = new Date();
  const fechaHoyString = hoy.toISOString().split("T")[0];
  const horaActual = hoy.getHours();
  const minutoActual = hoy.getMinutes();

  // Validar fecha de inicio
  if (!fecha_inicio) {
    errores.fecha_inicio = "La fecha de inicio es requerida";
  } else {
    const fechaInicioDate = new Date(fecha_inicio);
    const fechaHoyDate = new Date(fechaHoyString);

    if (fechaInicioDate < fechaHoyDate) {
      errores.fecha_inicio = "La fecha debe ser hoy o posterior";
    }
  }

  // Validar hora de inicio
  if (!hora_inicio) {
    errores.hora_inicio = "La hora de inicio es requerida";
  } else if (fecha_inicio === fechaHoyString) {
    // Si es hoy, validar que la hora sea futura
    const [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
    const minutosInicioTotal = horasInicio * 60 + minutosInicio;
    const minutosActualTotal = horaActual * 60 + minutoActual;

    if (minutosInicioTotal <= minutosActualTotal) {
      errores.hora_inicio = "La hora debe ser posterior a la actual";
    }
  }

  // Validar fecha final
  if (!fecha_fin) {
    errores.fecha_fin = "La fecha de finalización es requerida";
  } else if (fecha_inicio) {
    const fechaFin = new Date(fecha_fin);
    const fechaInicio = new Date(fecha_inicio);

    if (fechaFin < fechaInicio) {
      errores.fecha_fin =
        "La fecha final debe ser igual o posterior a la inicial";
    }
  }

  // Validar hora final
  if (!hora_fin) {
    errores.hora_fin = "La hora de finalización es requerida";
  } else if (fecha_fin && hora_inicio && fecha_inicio) {
    const fechaFin = new Date(fecha_fin);
    const fechaInicio = new Date(fecha_inicio);

    // Si es el mismo día, la hora final debe ser posterior a la inicial
    if (fechaFin.getTime() === fechaInicio.getTime()) {
      const [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
      const [horasFin, minutosFin] = hora_fin.split(":").map(Number);

      const minutosInicioTotal = horasInicio * 60 + minutosInicio;
      const minutosFinTotal = horasFin * 60 + minutosFin;

      if (minutosFinTotal <= minutosInicioTotal) {
        errores.hora_fin = "La hora final debe ser posterior a la hora inicial";
      }
    }
  }

  return {
    valid: Object.keys(errores).length === 0,
    errores,
  };
}
