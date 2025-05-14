import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const LandingPage = () => {
  return (
    <div>
      <h1 className="titleLanding">Alquileres de autos</h1>
      <Link to="https://www.instagram.com/">
        <FaInstagram />
      </Link>
      <Link to="https://x.com/explore">
        <FaTwitter />
      </Link>
      <Link to="https://www.facebook.com/?locale=es_ES">
        <FaFacebook />
      </Link>
      <Link to="https://web.whatsapp.com/">
        <IoLogoWhatsapp />
      </Link>

      <p className="textWelcome">
        Bienvenidos a la pagina de Alquileres de autos. Aqui podras encontrar el
        auto que desees a un precio de alquiler accesible Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Accusantium rem voluptatem reiciendis
        nesciunt quaerat, deleniti delectus dolore aperiam praesentium pariatur,
        eius aut consequatur ut saepe consequuntur. Deserunt, asperiores?
        Maiores, atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        A, voluptatum quas. Blanditiis necessitatibus pariatur dolorem amet
        dolorum delectus quaerat. Rem maiores quisquam dolores ipsa incidunt
        autem esse blanditiis minus laboriosam!
      </p>
      <button className="buttonRegisterLanding">Registrarse</button>
      <button className="buttonLogin">Inicio Sección</button>
      <p className="textDesign">
        Diseñado por: Milton Ruiz, Juan Sosa ,Branco Antuña
      </p>
      <p className="copyright">© 2025 Todos los derechos reservados</p>
    </div>
  );
};

export default LandingPage;
