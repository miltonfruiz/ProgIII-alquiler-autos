// export default function ModalValidation(formData) {
//   const errores = {};
//   const { fecha_inicio, fecha_fin } = formData;

//   const hoy = new Date();
//   hoy.setHours(0, 0, 0, 0); // normalizar fecha de hoy

//   if (fecha_inicio) {
//     const inicio = new Date(fecha_inicio);
//     inicio.setHours(0, 0, 0, 0);

//     if (inicio < hoy) {
//       errores.fecha_inicio = "Debe ingresar una fecha igual o posterior a hoy";
//     }
//   }

//   if (fecha_fin && fecha_inicio) {
//     const fin = new Date(fecha_fin);
//     fin.setHours(0, 0, 0, 0);

//     const inicio = new Date(fecha_inicio);
//     inicio.setHours(0, 0, 0, 0);

//     if (fin < inicio) {
//       errores.fecha_fin =
//         "La fecha final debe ser posterior o igual a la inicial";
//     }
//   }

//   return errores;
// }

export default function ModalValidation(formData) {
  const errores = {};
  const { fecha_inicio, fecha_fin, hora_inicio, hora_fin, lugar_devolucion } =
    formData;

  const hoy = new Date();
  const fechaHoyString = hoy.toISOString().split("T")[0];
  const horaActual = hoy.getHours();
  const minutoActual = hoy.getMinutes();
  const horaActualString = `${horaActual
    .toString()
    .padStart(2, "0")}:${minutoActual.toString().padStart(2, "0")}`;

  // Validación de fecha de inicio
  if (fecha_inicio) {
    const fechaInicioDate = new Date(fecha_inicio);
    const fechaHoy = new Date(fechaHoyString);

    // Permitir hoy y fechas futuras
    if (fechaInicioDate < fechaHoy) {
      errores.fecha_inicio = "La fecha debe ser hoy o posterior";
    }
  }

  // Validación de hora de inicio
  if (fecha_inicio && hora_inicio) {
    const esHoy = fecha_inicio === fechaHoyString;

    if (esHoy) {
      // Si es hoy, la hora debe ser posterior a la actual
      const [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
      const [horasActual, minutosActual] = [horaActual, minutoActual];

      const minutosInicioTotal = horasInicio * 60 + minutosInicio;
      const minutosActualTotal = horasActual * 60 + minutosActual;

      if (minutosInicioTotal <= minutosActualTotal) {
        errores.hora_inicio = "La hora debe ser posterior a la actual";
      }
    }
  }

  // Validación de fecha final
  if (fecha_fin && fecha_inicio) {
    const fechaFin = new Date(fecha_fin);
    const fechaInicio = new Date(fecha_inicio);

    if (fechaFin < fechaInicio) {
      errores.fecha_fin =
        "La fecha final debe ser igual o posterior a la inicial";
    }
  }

  // Validación de hora final
  if (fecha_fin && hora_fin && fecha_inicio && hora_inicio) {
    const fechaFin = new Date(fecha_fin);
    const fechaInicio = new Date(fecha_inicio);

    // Si es el mismo día, validar que la hora final sea posterior a la inicial
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

  return errores;
}
