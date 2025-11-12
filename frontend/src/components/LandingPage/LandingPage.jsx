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
    <>
      <section className="containerLanding">
        <div className="containerContent">
          {/* Contenido izquierdo */}
          <div className="contentLeft">
            <div className="textContent">
              <h1>
                Encuentra el <span className="highlight">auto perfecto</span>{" "}
                para tu próximo viaje
              </h1>

              <p className="textWelcome">
                Contamos con una flota moderna, precios accesibles y un servicio
                al cliente personalizado que garantiza una experiencia de
                alquiler rápida, segura y sin complicaciones. Reserva en línea
                en minutos y comienza tu viaje con nosotros.
              </p>

              <div className="containerButton">
                <button className="buttonLogin" onClick={handlerLogin}>
                  <FiLogIn size={16} /> Iniciar Sesión
                </button>
                <button
                  className="buttonRegisterLanding"
                  onClick={handlerRegister}
                >
                  <FaUserPlus size={16} /> Registrarse
                </button>
              </div>
            </div>

            <div className="container-project">
              <p>Proyecto UTN 2025 | Sosa-Branco</p>
            </div>
          </div>

          {/* Contenido derecho - Imagen */}
          <div className="contentRight">
            <div className="imageContainer">
              <img
                src="src/assets/imagenAutoLlave.png"
                alt="Auto perfecto para tu viaje"
                className="heroImage"
              />
              <div className="imageOverlay"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="infoSection">
        <div className="infoContainer">
          {/* ¿Qué es RentCars? */}
          <div className="mainCard">
            <div className="cardContent">
              <h2>¿Qué es RentCars?</h2>
              <p>
                RentCars es una plataforma innovadora de alquiler de vehículos
                pensada para facilitar la movilidad urbana y turística en todo
                el país. Ofrecemos una experiencia digital simple, rápida y
                segura.
              </p>
              <div className="cardIcon">🚗</div>
            </div>
          </div>

          {/* ¿Por qué elegirnos? */}
          <div className="benefitsCard">
            <div className="cardContent">
              <h2>¿Por qué elegirnos?</h2>
              <ul className="benefitsList">
                <li>
                  <span className="checkIcon">✅</span> Autos de última
                  generación: económicos y premium
                </li>
                <li>
                  <span className="checkIcon">✅</span> Flexibilidad total: por
                  horas, días o meses
                </li>
                <li>
                  <span className="checkIcon">✅</span> Reserva online: simple,
                  segura y en pocos clics
                </li>
                <li>
                  <span className="checkIcon">✅</span> Soporte 24/7 y
                  asistencia en ruta
                </li>
                <li>
                  <span className="checkIcon">✅</span> Retiro y entrega sin
                  demoras en aeropuertos
                </li>
                <li>
                  <span className="checkIcon">✅</span> Kilometraje ilimitado en
                  la mayoría de vehículos
                </li>
                <li>
                  <span className="checkIcon">✅</span> Múltiples métodos de
                  pago y garantía
                </li>
              </ul>
              <div className="cardIcon">❓</div>
            </div>
          </div>

          {/* ¿Cómo funciona? */}
          <div className="processCard">
            <div className="cardContent">
              <h2>¿Cómo funciona?</h2>
              <ol className="processList">
                <li>
                  <span className="stepNumber">1</span>
                  <div className="stepContent">
                    <span className="stepIcon">📋</span>
                    <span>Registrate gratis y creá tu perfil</span>
                  </div>
                </li>
                <li>
                  <span className="stepNumber">2</span>
                  <div className="stepContent">
                    <span className="stepIcon">🚗</span>
                    <span>Elegí el auto que más te guste</span>
                  </div>
                </li>
                <li>
                  <span className="stepNumber">3</span>
                  <div className="stepContent">
                    <span className="stepIcon">📆</span>
                    <span>Reservá la fecha y duración del alquiler</span>
                  </div>
                </li>
                <li>
                  <span className="stepNumber">4</span>
                  <div className="stepContent">
                    <span className="stepIcon">✅</span>
                    <span>Confirmá y disfruta de tu auto listo para usar</span>
                  </div>
                </li>
              </ol>
            </div>
            <div className="cardIcon">👀</div>
          </div>
        </div>
      </section>

      <section className="section" id="estadisticas">
        <div className="h3-title">
          <h3>
            <FaChartLine className="icon-title-landing" /> Estadísticas
          </h3>
        </div>

        <div className="statsContainer">
          <div className="statBox width-cont">
            <h4>+1200</h4>
            <p>Clientes satisfechos</p>
          </div>
          <div className="statBox">
            <h4>95%</h4>
            <p>Reservas completadas con éxito</p>
          </div>
          <div className="statBox">
            <h4>30+</h4>
            <p>Modelos de autos disponibles</p>
          </div>
        </div>
      </section>
      <LandingFooter />
    </>
  );
};

export default LandingPage;
