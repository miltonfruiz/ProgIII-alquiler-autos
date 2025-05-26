import { useState } from "react";
import "./PasswordRecover.css";
import { MdEmail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";

const PasswordRecover = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Debes ingresar un email válido");
      return;
    }
    toast.success("Se enviaron las instrucciones a tu correo");
    setEmail("");
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
          id="email"
          name="email"
          placeholder="tunombre@gmail.com"
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
