import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "./PasswordRecover.css";

const PasswordRecover = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Debes ingresar un email válido");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Error al enviar el correo");
        return;
      }
      toast.success(data.message || "Instrucciones enviadas");
      setEmail("");
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      toast.error("Error del servidor. Intenta más tarde.");
    }
  };
  return (
    <div className="page-recovery">
      <form className="form-recovery" onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>
        <label htmlFor="email">
          <MdEmail size={14} className="md-email" />
          Correo electrónico
        </label>
        <input
          type="email"
          id="email-recovery"
          name="email"
          placeholder="recuperar@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button-send-instructions" type="submit">
          <IoIosSend size={14} />
          Enviar instrucciones
        </button>
        <p className="back-link">
          <a href="/">
            <TiArrowBack size={14} className="arrow-back" />
            Volver a Inicio Sesión
          </a>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

export default PasswordRecover;
