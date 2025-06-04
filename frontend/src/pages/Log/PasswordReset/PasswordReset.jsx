import { useState } from "react";
import { MdLockReset, MdEmail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "./PasswordReset.css";

const ResetPassword = () => {
  const [form, setForm] = useState({
    correo: "",
    nuevaContraseña: "",
    repetirContraseña: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.tzarget.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.correo || !form.nuevaContraseña || !form.repetirContraseña) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
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
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      toast.error("Error del servidor");
    }
  };
  return (
    <div className="page-reset">
      <form className="form-reset" onSubmit={handleSubmit}>
        <h2>
          <MdLockReset /> Restablecer Contraseña
        </h2>
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
        <label>Nueva contraseña</label>
        <input
          type="password"
          name="nuevaContraseña"
          placeholder="Nueva contraseña"
          value={form.nuevaContraseña}
          onChange={handleChange}
        />
        <label>Repetir contraseña</label>
        <input
          type="password"
          name="repetirContraseña"
          placeholder="Confirmar contraseña"
          value={form.repetirContraseña}
          onChange={handleChange}
        />
        <button className="button-send-instructions" type="submit">
          <IoIosSend size={14} /> Guardar nueva contraseña
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
