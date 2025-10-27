// export default function ModalValidation(formData) {
//   const errores = {};
//   const { fecha_inicio, fecha_fin, hora_inicio, hora_fin } = formData;

//   const hoy = new Date();
//   const fechaHoyString = `${hoy.getFullYear()}-${String(
//     hoy.getMonth() + 1
//   ).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
//   const horaActual = hoy.getHours();
//   const minutoActual = hoy.getMinutes();

//   // Validación de fecha de inicio
//   if (fecha_inicio) {
//     // Comparar strings directamente para evitar problemas de timezone
//     if (fecha_inicio < fechaHoyString) {
//       errores.fecha_inicio = "La fecha debe ser hoy o posterior";
//     }
//   }

//   // Validación de hora de inicio
//   if (fecha_inicio && hora_inicio) {
//     const esHoy = fecha_inicio === fechaHoyString;

//     if (esHoy) {
//       const [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
//       const minutosInicioTotal = horasInicio * 60 + minutosInicio;
//       const minutosActualTotal = horaActual * 60 + minutoActual;

//       if (minutosInicioTotal <= minutosActualTotal) {
//         errores.hora_inicio = "La hora debe ser posterior a la actual";
//       }
//     }
//   }

//   // Validación de fecha final
//   if (fecha_fin && fecha_inicio) {
//     // Comparar strings directamente
//     if (fecha_fin < fecha_inicio) {
//       errores.fecha_fin =
//         "La fecha final debe ser igual o posterior a la inicial";
//     }
//   }

//   // Validación de hora final
//   if (fecha_fin && hora_fin && fecha_inicio && hora_inicio) {
//     // Si es el mismo día, validar que la hora final sea posterior a la inicial
//     if (fecha_fin === fecha_inicio) {
//       const [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
//       const [horasFin, minutosFin] = hora_fin.split(":").map(Number);

//       const minutosInicioTotal = horasInicio * 60 + minutosInicio;
//       const minutosFinTotal = horasFin * 60 + minutosFin;

//       if (minutosFinTotal <= minutosInicioTotal) {
//         errores.hora_fin = "La hora final debe ser posterior a la hora inicial";
//       }
//     }
//   }

//   return errores;
// }

export default function ModalValidation(formData) {
  const errores = {};
  const { fecha_inicio, fecha_fin, hora_inicio, hora_fin } = formData;

  // Obtener fecha y hora actual en la zona horaria local
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  const fechaHoyString = `${anio}-${mes}-${dia}`;

  const horaActual = ahora.getHours();
  const minutoActual = ahora.getMinutes();

  // Validación de fecha de inicio
  if (fecha_inicio) {
    if (fecha_inicio < fechaHoyString) {
      errores.fecha_inicio = "La fecha debe ser hoy o posterior";
    }
  }

  // Validación de hora de inicio
  if (fecha_inicio && hora_inicio) {
    const esHoy = fecha_inicio === fechaHoyString;

    if (esHoy) {
      const [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
      const minutosInicioTotal = horasInicio * 60 + minutosInicio;
      const minutosActualTotal = horaActual * 60 + minutoActual;

      if (minutosInicioTotal <= minutosActualTotal) {
        errores.hora_inicio = "La hora debe ser posterior a la actual";
      }
    }
  }

  // Validación de fecha final
  if (fecha_fin && fecha_inicio) {
    if (fecha_fin < fecha_inicio) {
      errores.fecha_fin =
        "La fecha final debe ser igual o posterior a la inicial";
    }
  }

  // Validación de hora final
  if (fecha_fin && hora_fin && fecha_inicio && hora_inicio) {
    if (fecha_fin === fecha_inicio) {
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
