const ModalValidation = ({ datos }) => {
  const errores = {};

  if (!datos.stars || datos.stars < 1 || datos.stars > 5) {
    errores.stars = "* Ingrese calificación...";
  }
  if (!datos.comment || datos.comment.trim() === "") {
    errores.comment = "* Ingrese comentario...";
  } else if (datos.comment.length > 250) {
    errores.comment = "* El comentario no puede exceder los 250 caracteres";
  }
  return errores;
};

export default ModalValidation;
