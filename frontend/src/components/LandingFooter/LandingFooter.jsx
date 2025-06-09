import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaCarSide } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import "./LandingFooter.css";

const LandingFooter = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerSection about">
          <h4>RentCars</h4>
          <p>
            Tu viaje comienza con nosotros. Alquiler rápido, seguro y accesible.
          </p>
        </div>
        <div className="footerSection contact">
          <h4>Contacto</h4>
          <p>📞 0800-123-456</p>
          <p>✉ contacto@rentcars.com</p>
          <p>📍 Rosario, Santa Fe</p>
        </div>
        <div className="footerSection social">
          <h4>Redes Sociales</h4>
          <div className="socialIcons">
            <Link
              className="footer-a-icons"
              to="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="logo" />
            </Link>
            <Link
              className="footer-a-icons"
              to="https://x.com/explore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="logo" />
            </Link>
            <Link
              className="footer-a-icons"
              to="https://www.facebook.com/?locale=es_ES"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="logo" />
            </Link>
            <Link
              className="footer-a-icons"
              to="https://web.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoWhatsapp className="logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>Diseñado por: Milton Ruiz, Juan Sosa, Branco Antuña</p>
        <h6>
          © {new Date().getFullYear()} RentCar. Todos los derechos reservados.
        </h6>
      </div>
    </footer>
  );
};

export default LandingFooter;
