import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
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
            <h1 className="titleLanding">Alquileres de autos</h1>
          </div>
          <p className="textWelcome">
            ¡Bienvenidos a [Nombre de tu Empresa]– Tu Solución en Alquiler de
            Autos! ¿Necesitas un auto confiable para tus viajes de negocios,
            vacaciones o simplemente moverte con libertad? En [Nombre de tu
            Empresa], te ofrecemos una flota moderna, precios competitivos y un
            servicio personalizado para que tu experiencia de alquiler sea
            rápida, fácil y sin complicaciones
          </p>
          <div className="containerButton">
            <button className="buttonRegisterLanding" onClick={handlerRegister}>
              Registrarse
            </button>
            <button className="buttonLogin" onClick={handlerLogin}>
              Inicio Sección
            </button>
          </div>
        </div>
        <div className="containerContenido">
          <div className="textContenido">
            <h3>¿Por qué elegirnos?</h3>
            <ul>
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
            <p>
              📍 Retiro y entrega sin demoras en aeropuertos y sucursales
              estratégicas.
            </p>
            <p>🚗 Kilometraje ilimitado en la mayoría de nuestros vehículos.</p>
            <p>💳 Múltiples métodos de pago y opciones de garantía.</p>
            <p>
              ¡Tu viaje comienza aquí! Explora nuestras promociones, compara
              modelos y reserva hoy mismo.
            </p>
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
