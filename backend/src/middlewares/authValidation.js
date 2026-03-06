export const verificarAdmin = (req, res, next) => {
  const { rol } = req.user;

  if (rol !== "administrador") {
    return res.status(403).json({
      error: "Acceso denegado. Se requieren permisos de administrador.",
    });
  }

  next();
};

export const verificarEmpleadoOAdmin = (req, res, next) => {
  const { rol } = req.user;

  if (rol !== "empleado") {
    return res.status(403).json({
      error:
        "Acceso denegado. Se requieren permisos de empleado o administrador.",
    });
  }

  next();
};

export const verificarAutenticado = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "No autenticado" });
  }

  next();
};
