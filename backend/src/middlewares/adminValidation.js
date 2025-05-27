export function adminValidation(req, res, next) {
  const { usuario, contraseña } = req.body;

  if (usuario === "admin" && contraseña === "admin") {
    next();
  } else {
    res
      .status(401)
      .json({ error: "Acceso denegado: usuario o contraseña inválidos." });
  }
}
