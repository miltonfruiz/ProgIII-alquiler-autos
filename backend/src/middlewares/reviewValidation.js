export function reviewValidation(req, res, next) {
  const { rating, comment, carId, username, userId } = req.body;
  const errors = {};

  if (typeof rating === "undefined" || rating === null) {
    errors.rating = "La valoración es obligatoria.";
  } else if (isNaN(rating)) {
    errors.rating = "La valoración debe ser un número.";
  } else if (rating < 1 || rating > 5) {
    errors.rating = "La valoración debe estar entre 1 y 5.";
  }

  if (!comment || typeof comment !== "string" || comment.trim() === "") {
    errors.comment = "El comentario es obligatorio y debe ser texto válido.";
  }

  if (!carId) {
    errors.carId = "El ID del auto es obligatorio.";
  }

  if (!username || !username.trim()) {
    errors.username = "El nombre de usuario es obligatorio.";
  }

  if (!userId) {
    errors.userId = "El ID de usuario es obligatorio.";
  } else if (isNaN(Number(userId))) {
    errors.userId = "El ID de usuario debe ser un número.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}
