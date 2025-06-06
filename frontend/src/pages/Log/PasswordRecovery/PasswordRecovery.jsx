import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import PasswordValidation from "../PasswordValidation/PasswordValidation";
import "./PasswordRecovery.css";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [backendError, setBackendError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setBackendError("");
    const { emailError: localError } = PasswordValidation({ correo: email });
    if (localError) {
      setEmailError(localError);
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/password-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error?.includes("no existe")) {
          setBackendError("Ese correo no existe");
        } else {
          toast.error(data.error || "Error al enviar el correo");
        }
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
        <div className="form-group-recovery">
          <label htmlFor="email">
            <MdEmail size={14} className="md-email" />
            Correo electrónico
          </label>
          <input
            type="email"
            id="email-recovery"
            name="email-recovery"
            placeholder="recuperar@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p
            className={`input-error-recovery ${
              backendError || emailError ? "visible" : ""
            }`}
          >
            {backendError || emailError || ""}
          </p>
        </div>
        <button className="button-send-instructions" type="submit">
          <IoIosSend size={14} />
          Enviar instrucciones
        </button>
        <p className="back-link">
          <a href="/login">
            <TiArrowBack size={14} className="arrow-back" />
            Volver a Inicio Sesión
          </a>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

export default PasswordRecovery;
