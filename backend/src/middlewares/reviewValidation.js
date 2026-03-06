export function reviewValidation(req, res, next) {
  const { rating, comment, carId, username, userId } = req.body;
  const errors = {};

  console.log("🔍 Validando datos recibidos:", req.body);

  // Validación de rating
  if (typeof rating === "undefined" || rating === null) {
    errors.rating = "La valoración es obligatoria.";
  } else if (isNaN(rating)) {
    errors.rating = "La valoración debe ser un número.";
  } else if (rating < 1 || rating > 5) {
    errors.rating = "La valoración debe estar entre 1 y 5.";
  }

  // Validación de comment
  if (typeof comment === "undefined" || comment === null) {
    errors.comment = "El comentario es obligatorio.";
  } else if (typeof comment !== "string") {
    errors.comment = "El comentario debe ser texto válido.";
  } else if (comment.trim() === "") {
    errors.comment = "El comentario no puede estar vacío.";
  }

  // Validación de carId
  if (!carId) {
    errors.carId = "El ID del auto es obligatorio.";
  } else if (isNaN(Number(carId))) {
    errors.carId = "El ID del auto debe ser un número.";
  }

  // Validación de username
  if (!username || !username.trim()) {
    errors.username = "El nombre de usuario es obligatorio.";
  }

  // Validación de userId
  if (!userId) {
    errors.userId = "El ID de usuario es obligatorio.";
  } else if (isNaN(Number(userId))) {
    errors.userId = "El ID de usuario debe ser un número.";
  }

  console.log("❌ Errores de validación:", errors);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  console.log("✅ Validación exitosa");
  next();
}
