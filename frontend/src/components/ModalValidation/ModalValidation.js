const ModalValidation = (datos) => {
  const errores = {};
  const { fecha_inicio, fecha_fin } = datos;

  // Validación fecha inicio
  if (!fecha_inicio || !fecha_inicio.trim()) {
    errores.fecha_inicio = "Debe ingresar una fecha válida";
  } else {
    if (!esFechaValida(fecha_inicio)) {
      errores.fecha_inicio = "Formato de fecha inválido";
    } else {
      const hoy = new Date();
      const dia = String(hoy.getDate()).padStart(2, "0");
      const mes = String(hoy.getMonth() + 1).padStart(2, "0");
      const anio = hoy.getFullYear();

      const fechaHoyStr = `${dia}/${mes}/${anio}`;

      const fechaStr = fechaHoyStr;
      const [diaStr, mesStr, anioStr] = fechaStr.split("/"); // ⚠️ Nombres distintos
      const fechaDate = new Date(anioStr, mesStr - 1, diaStr);

      if (new Date(fecha_inicio) < fechaHoyStr) {
        errores.fecha_inicio = "Debe ingresar una fecha posterior a hoy";
      }
    }
  }

  // Validación fecha fin
  if (!fecha_fin || !fecha_fin.trim()) {
    errores.fecha_fin = "Debe ingresar una fecha válida";
  } else {
    if (!esFechaValida(fecha_fin)) {
      errores.fecha_fin = "Formato de fecha inválido";
    } else {
      const hoy = new Date();
      const dia = String(hoy.getDate()).padStart(2, "0");
      const mes = String(hoy.getMonth() + 1).padStart(2, "0");
      const anio = hoy.getFullYear();

      const fechaHoyStr = `${dia}/${mes}/${anio}`;

      const fechaStr = fechaHoyStr;
      const [diaStr, mesStr, anioStr] = fechaStr.split("/"); // ⚠️ Nombres distintos
      const fechaDate = new Date(anioStr, mesStr - 1, diaStr);

      if (new Date(fecha_fin) < fechaHoyStr) {
        errores.fecha_fin = "Debe ingresar una fecha posterior a hoy";
      }
    }
  }

  // Validación cruzada
  if (
    fecha_inicio &&
    fecha_fin &&
    esFechaValida(fecha_inicio) &&
    esFechaValida(fecha_fin)
  ) {
    if (new Date(fecha_fin) < new Date(fecha_inicio)) {
      errores.fecha_fin = "La fecha final debe ser posterior a la inicial";
    }
  }

  return errores;
};

export default ModalValidation;

// Función auxiliar para validar formato de fecha
const esFechaValida = (fechaStr) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(fechaStr)) return false;

  const fecha = new Date(fechaStr);
  return !isNaN(fecha.getTime());
};
