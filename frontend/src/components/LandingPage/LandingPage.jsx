import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter, FaFacebook, FaUserPlus, FaCarSide } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  function handlerRegister() {
    navigate("/register");
  }

  function handlerLogin() {
    navigate("/");
  }

  return (
    <div>
      <div className="containerLanding">
        <div className="containerHeader">
          <div className="containerH1">
            <h1 className="titleLanding">
              <FaCarSide /> Bienvenidos RentCars!
            </h1>
          </div>

          <p className="textWelcome">
            Contamos con una flota moderna, precios accesibles y un servicio al
            cliente personalizado que garantiza una experiencia de alquiler
            rápida, segura y sin complicaciones. Reserva en línea en minutos y
            comienza tu viaje con nosotros. Tu mejor opción en alquiler de autos
          </p>
          <div className="containerButton">
            <button className="buttonLogin" onClick={handlerLogin}>
              <FiLogIn size={14} /> Iniciar Sesión
            </button>
            <button className="buttonRegisterLanding" onClick={handlerRegister}>
              <FaUserPlus size={14} /> Registrarse
            </button>
          </div>
          <div className="container-project">
            <p>Proyecto UTN 2025 - Grupo 6 :)</p>
          </div>
        </div>
        <div className="containerContenido">
          <div className="textContenido">
            <h3>¿Por qué elegirnos?</h3>
            <ul className="ulPorqueElegirnos">
              <li>
                ✅Autos de última generación: Desde económicos hasta premium,
                todos en perfecto estado.
              </li>
              <li>
                ✅ Flexibilidad: Alquileres por horas, días o meses, adaptados a
                tus necesidades.
              </li>
              <li>✅ Reserva online: Simple, segura y en pocos clics.</li>
              <li>
                ✅ Asistencia 24/7: Soporte en ruta para que viajes con
                tranquilidad.
              </li>
              <li>
                ✅ Precios transparentes: Sin cargos ocultos, con seguro básico
                incluido.
              </li>
            </ul>
            <h4>Destaca con nosotros</h4>
            <ul className="ulDestaca">
              <li>
                📍 Retiro y entrega sin demoras en aeropuertos y sucursales
                estratégicas.
              </li>
              <li>
                🚗 Kilometraje ilimitado en la mayoría de nuestros vehículos.
              </li>
              <li>💳 Múltiples métodos de pago y opciones de garantía.</li>
            </ul>
            <b className="bContenido">
              ¡Tu viaje comienza aquí! Explora nuestras promociones, compara
              modelos y reserva hoy mismo.
            </b>
            <p>
              Con [Nombre de tu Empresa], la libertad de moverte está a solo un
              clic de distancia.
            </p>
            <p>📞 Contáctanos: [Teléfono] | ✉ Email: [Correo] |</p>
            <p>🌐 Visítanos: [Dirección o enlace a redes sociales].</p>
            <p>
              [Nombre de tu Empresa] – Más que un alquiler, una experiencia sin
              límites
            </p>
          </div>
        </div>
        <div className="footer">
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
