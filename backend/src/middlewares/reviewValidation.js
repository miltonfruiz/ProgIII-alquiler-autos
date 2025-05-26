export function reviewValidation(req, res, next) {
  const { rating, comments, carId } = req.body;
  const errors = {};
  if (typeof rating === "undefined") {
    errors.rating = "La valoración es obligatoria.";
  } else if (isNaN(rating)) {
    errors.rating = "La valoración debe ser un número.";
  } else if (rating < 1 || rating > 5) {
    errors.rating = "La valoración debe estar entre 1 y 5.";
  }
  if (comments && typeof comments !== "string") {
    errors.comments = "Los comentarios deben ser texto.";
  }
  if (!carId) {
    errors.carId = "El ID del auto es obligatorio.";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}
