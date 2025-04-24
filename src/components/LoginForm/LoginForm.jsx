import { useState } from "react";
import "./LoginForm.css";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";

const LoginForm = ({ onSubmit, errores, refs }) => {
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
    onSubmit(formData);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Iniciar Sesión</h2>
      <div className="form-group">
        <label htmlFor="email" className="label-with-icon">
          <MdEmail size={13} />
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="tunombre@gmail.com"
          value={formData.email}
          onChange={handleChange}
          ref={refs.emailRef}
        />
        <p className={`error-message ${errores.email ? "visible" : ""}`}>
          {errores.email || ""}
        </p>
      </div>
      <div className="form-group">
        <label htmlFor="password" className="label-with-icon">
          <FaLock size={12} />
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          ref={refs.passwordRef}
        />
        <p className={`error-message ${errores.password ? "visible" : ""}`}>
          {errores.password || ""}
        </p>
      </div>
      <div className="button-container">
        <button type="submit" className="login-button">
          <FiLogIn size={14} />
          Iniciar Sesión
        </button>
      </div>
      <p className="forgot-password">
        <a href="/recuperar-password">¿Olvidaste tu contraseña?</a>
      </p>
      <p className="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </form>
  );
};

export default LoginForm;
