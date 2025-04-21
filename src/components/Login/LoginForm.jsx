import { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Falta lógica console.log("Datos enviados:", formData);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Inicia Sesión</h2>
      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="tunombre@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="login-button">
        Iniciar Sesión
      </button>
      <p className="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </form>
  );
};

export default LoginForm;
