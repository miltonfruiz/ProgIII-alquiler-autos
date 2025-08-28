import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaCarSide,
  FaQuestionCircle,
  FaStar,
  FaChartLine,
} from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { FaGear } from "react-icons/fa6";
import LandingFooter from "../LandingFooter/LandingFooter";

const LandingPage = () => {
  const navigate = useNavigate();
  function handlerRegister() {
    navigate("/register");
  }
  function handlerLogin() {
    navigate("/login");
  }
  return (
    <div>
      <section className="containerLanding">
        <div className="containerHeader">
          <div className="containerH1">
            <h1 className="titleLanding">¡Bienvenidos a RentCars!</h1>
          </div>
          <p className="textWelcome">
            Contamos con una flota moderna, precios accesibles y un servicio al
            cliente personalizado que garantiza una experiencia de alquiler
            rápida, segura y sin complicaciones. Reserva en línea en minutos y
            comienza tu viaje con nosotros. Tu mejor opción en alquiler de autos
            cliente personalizado. Reserva en línea en minutos y comenzá tu
            viaje.
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
      </section>
      <div className="containerContenido">
        <section className="section" id="rentcar">
          <h2 className="h2-title">
            <FaQuestionCircle className="icon-title-landing" /> ¿Qué es
            RentCars?
          </h2>
          <p>
            RentCars es una plataforma innovadora de alquiler de vehículos
            pensada para facilitar la movilidad urbana y turística en todo el
            país. Ofrecemos una experiencia digital simple, rápida y segura.
          </p>
        </section>
        <section className="section" id="funciona">
          <h2 className="h2-title">
            <FaGear className="icon-title-landing" /> ¿Cómo funciona?
          </h2>
          <ol>
            <li>📋 Registrate gratis y creá tu perfil.</li>
            <li>🚗 Elegí el auto que más te guste.</li>
            <li>📆 Reservá la fecha y duración del alquiler.</li>
            <li>✅ Confirmá y recibí tu auto listo para rodar.</li>
          </ol>
        </section>
        <section className="section" id="porque-elegirnos">
          <h2 className="h2-title">
            <FaStar className="icon-title-landing" /> ¿Por qué elegirnos?
          </h2>
          <ul className="ulPorqueElegirnos">
            <li>✅ Autos de última generación: económicos y premium.</li>
            <li>✅ Flexibilidad total: por horas, días o meses.</li>
            <li>✅ Reserva online: simple, segura y en pocos clics.</li>
            <li>✅ Soporte 24/7 y asistencia en ruta.</li>
            <li>
              ✅ Retiro y entrega sin demoras en aeropuertos y sucursales
              estratégicas.
            </li>
            <li>
              ✅ Kilometraje ilimitado en la mayoría de nuestros vehículos.
            </li>
            <li>✅ Múltiples métodos de pago y opciones de garantía.</li>
          </ul>
        </section>
        <section className="section" id="estadisticas">
          <h2 className="h2-title">
            <FaChartLine className="icon-title-landing" /> Estadísticas
          </h2>
          <div className="statsContainer">
            <div className="statBox width-cont">
              <h3>+1200</h3>
              <p>Clientes satisfechos</p>
            </div>
            <div className="statBox">
              <h3>95%</h3>
              <p>Reservas completadas con éxito</p>
            </div>
            <div className="statBox">
              <h3>30+</h3>
              <p>Modelos de autos disponibles</p>
            </div>
          </div>
        </section>
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
