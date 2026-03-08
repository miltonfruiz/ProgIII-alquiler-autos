import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      errores: {
        dispoinibilidad: "No autenticado",
      },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // popula req.user para los siguientes middlewares
    next();
  } catch {
    return res
      .status(401)
      .json({ errores: { dispoinibilidad: "Token inválido o expirado" } });
  }
};

export const verificarAdmin = (req, res, next) => {
  const { rol } = req.user;

  if (rol !== "administrador") {
    return res.status(403).json({
      errores: {
        dispoinibilidad:
          "Acceso denegado. Se requieren permisos de administrador.",
      },
    });
  }

  next();
};

export const verificarEmpleadoOAdmin = (req, res, next) => {
  const { rol } = req.user;

  if (rol !== "empleado") {
    return res.status(403).json({
      errores: {
        dispoinibilidad:
          "Acceso denegado. Se requieren permisos de empleado o administrador.",
      },
    });
  }

  next();
};

export const verificarAutenticado = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ errores: { dispoinibilidad: "No autenticado" } });
  }

  next();
};
