import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRepeat } from "react-icons/fa6";
import PasswordResetValidation from "../PasswordResetValidation/PasswordResetValidation";
import "./PasswordReset.css";

const ResetPassword = () => {
  const [form, setForm] = useState({
    correo: "",
    nuevaContraseña: "",
    repetirContraseña: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = PasswordResetValidation(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Error al restablecer contraseña");
        return;
      }

      toast.success(data.message);
      setForm({ correo: "", nuevaContraseña: "", repetirContraseña: "" });
      setErrors({});
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      toast.error("Error del servidor");
    }
  };

  return (
    <div className="page-reset">
      <form className="form-reset" onSubmit={handleSubmit}>
        <h2>Restablecer Contraseña</h2>

        <div className="form-group-reset">
          <label>
            <MdEmail size={14} /> Correo electrónico
          </label>
          <input
            type="email"
            name="correo"
            placeholder="tunombre@email.com"
            value={form.correo}
            onChange={handleChange}
          />
          <p className={`input-error-reset ${errors.correo ? "visible" : ""}`}>
            {errors.correo || ""}
          </p>
        </div>

        <div className="form-group-reset">
          <label>
            <RiLockPasswordFill /> Nueva contraseña
          </label>
          <input
            type="password"
            name="nuevaContraseña"
            placeholder="Nueva contraseña"
            value={form.nuevaContraseña}
            onChange={handleChange}
          />
          <p
            className={`input-error-reset ${
              errors.nuevaContraseña ? "visible" : ""
            }`}
          >
            {errors.nuevaContraseña || ""}
          </p>
        </div>

        <div className="form-group-reset">
          <label>
            <FaRepeat size={12} /> Repetir contraseña
          </label>
          <input
            type="password"
            name="repetirContraseña"
            placeholder="Confirmar contraseña"
            value={form.repetirContraseña}
            onChange={handleChange}
          />
          <p
            className={`input-error-reset ${
              errors.repetirContraseña ? "visible" : ""
            }`}
          >
            {errors.repetirContraseña || ""}
          </p>
        </div>

        <button className="button-send-instructions-reset" type="submit">
          <IoIosSend size={14} /> Guardar
        </button>

        <p className="back-link">
          <a href="/login">
            <TiArrowBack size={14} /> Volver al inicio de sesión
          </a>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

export default ResetPassword;
