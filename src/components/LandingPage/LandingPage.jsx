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
      <div className="containerLanding">
        <div className="containerH1">
          <h1 className="titleLanding">Alquileres de autos</h1>
        </div>
        <div className="containerSocialP">
          <div className="containerSocial">
            <Link to="https://www.instagram.com/">
              <FaInstagram className="logo" />
            </Link>
            <Link to="https://x.com/explore">
              <FaTwitter className="logo" />
            </Link>
            <Link to="https://www.facebook.com/?locale=es_ES">
              <FaFacebook className="logo" />
            </Link>
            <Link to="https://web.whatsapp.com/">
              <IoLogoWhatsapp className="logo" />
            </Link>
          </div>
          <div className="containerPbutton">
            <div className="containerP">
              <p className="textWelcome">
                Bienvenidos a la pagina de Alquileres de autos. Aqui podras
                encontrar el auto que desees a un precio de alquiler accesible
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium rem voluptatem reiciendis nesciunt quaerat, deleniti
                delectus dolore aperiam praesentium pariatur, eius aut
                consequatur ut saepe consequuntur. Deserunt, asperiores?
                Maiores, atque. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. A, voluptatum quas. Blanditiis necessitatibus
                pariatur dolorem amet dolorum delectus quaerat. Rem maiores
                quisquam dolores ipsa incidunt autem esse blanditiis minus
                laboriosam!
              </p>
            </div>
            <div className="containerButton">
              <button className="buttonRegisterLanding">Registrarse</button>
              <button className="buttonLogin">Inicio Sección</button>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="containerDesign">
            <p className="textDesign">
              Diseñado por: Milton Ruiz, Juan Sosa ,Branco Antuña
            </p>
          </div>

          <div className="containerCopyright">
            <p className="copyright">© 2025 Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
