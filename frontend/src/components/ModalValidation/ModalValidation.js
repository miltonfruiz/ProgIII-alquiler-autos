export default function ModalValidation(formData) {
  const errores = {};
  const { fecha_inicio, fecha_fin } = formData;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // normalizar fecha de hoy

  if (fecha_inicio) {
    const inicio = new Date(fecha_inicio);
    inicio.setHours(0, 0, 0, 0);

    if (inicio < hoy) {
      errores.fecha_inicio = "Debe ingresar una fecha igual o posterior a hoy";
    }
  }

  if (fecha_fin && fecha_inicio) {
    const fin = new Date(fecha_fin);
    fin.setHours(0, 0, 0, 0);

    const inicio = new Date(fecha_inicio);
    inicio.setHours(0, 0, 0, 0);

    if (fin < inicio) {
      errores.fecha_fin =
        "La fecha final debe ser posterior o igual a la inicial";
    }
  }

  return errores;
}
