export function adminValidation(req, res, next) {
  const { correo, contraseña } = req.body;

  if (correo === "admin@test.com" && contraseña === "admin123") {
    next();
  } else {
    res
      .status(401)
      .json({ error: "Acceso denegado: usuario o contraseña inválidos." });
  }
}
