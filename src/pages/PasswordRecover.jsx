import { useState } from "react";
import "./PasswordRecover.css";
import { MdEmail } from "react-icons/md";
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
    <div className="recuperar-page">
      <form className="recuperar-form" onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>
        <label htmlFor="email">
          <MdEmail size={14} style={{ marginRight: "0.5rem" }} />
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
        <button type="submit">Enviar instrucciones</button>
        <p className="volver-link">
          <a href="/">Volver al login</a>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

export default PasswordRecover;
