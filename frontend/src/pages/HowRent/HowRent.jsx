import React, { useState } from "react";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import styles from "./HowRent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCheckCircle,
  faShieldAlt,
  faFileContract,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

export default function HowRent() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const requisitos = [
    "Edad mínima: 25 años",
    "Licencia de conducir del país (depende del idioma)",
    "Pasaporte o DNI",
    "Tarjeta de crédito internacional a nombre del conductor",
    "Comprobante de reserva - cupón prepago",
  ];

  const faqs = [
    {
      pregunta: "¿Qué es el depósito de garantía y cómo funciona?",
      respuesta:
        "El depósito de garantía es un monto que se bloquea temporalmente en tu tarjeta de crédito como garantía. Este dinero no se cobra, solo se retiene. Una vez que devuelvas el vehículo en las condiciones acordadas, el bloqueo se libera automáticamente en 7-14 días hábiles.",
    },
    {
      pregunta: "¿Cuál es el valor del depósito de garantía?",
      respuesta:
        "El monto del depósito varía según el tipo de vehículo y la cobertura seleccionada. Generalmente oscila entre $50,000 y $150,000 ARS. El monto exacto se especifica al momento de confirmar tu reserva.",
    },
    {
      pregunta: "¿Cómo funcionan las protecciones?",
      respuesta:
        "Ofrecemos tres niveles de protección: Protección del Vehículo (daños al auto alquilado), Protección Contra Terceros (daños a otros vehículos o personas), y Protección Contra Robos. Cada una cubre diferentes situaciones y tiene distintos niveles de coparticipación.",
    },
    {
      pregunta: '¿Qué significa "coparticipación" o "cobertura"?',
      respuesta:
        "La coparticipación es el monto máximo que pagarías en caso de un siniestro. Por ejemplo, con una coparticipación de $30,000, si hay un daño de $100,000, solo pagarás $30,000 y el seguro cubre el resto.",
    },
    {
      pregunta: "¿Cuál es el valor de la coparticipación o cobertura?",
      respuesta:
        "El valor de la coparticipación depende del paquete elegido. Nuestro paquete básico tiene una coparticipación de $50,000 ARS, el intermedio de $30,000 ARS, y el premium de $10,000 ARS o cobertura total según el vehículo.",
    },
    {
      pregunta: "¿Hay elementos que no estén cubiertos por la protección?",
      respuesta:
        "Sí, generalmente no están cubiertos: neumáticos, llantas, espejos retrovisores, antena, interior del vehículo (tapizados), y daños por conducción temeraria o bajo efectos del alcohol. También se excluyen multas de tránsito y peajes.",
    },
    {
      pregunta: "¿Puedo cambiar o cancelar mi reserva?",
      respuesta:
        "Sí, puedes cancelar con hasta 48 horas de anticipación para obtener un reembolso completo. Las modificaciones se pueden realizar hasta 24 horas antes sin costo adicional. Cancelaciones con menos tiempo pueden estar sujetas a penalidades.",
    },
  ];

  return (
    <>
      <UserNavbar />
      <section className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Información para tu reserva</h1>
          <p className={styles.subtitle}>
            Todo lo que necesitas saber antes de alquilar tu vehículo
          </p>
        </div>

        {/* Requisitos */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FontAwesomeIcon icon={faFileContract} className={styles.icon} />
            <h2 className={styles.sectionTitle}>
              ¿Cuáles son los requisitos para alquilar un auto?
            </h2>
          </div>
          <ul className={styles.requisitosList}>
            {requisitos.map((req, index) => (
              <li key={index} className={styles.requisitoItem}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={styles.checkIcon}
                />
                <span>{req}</span>
              </li>
            ))}
          </ul>
          <div className={styles.importante}>
            <strong>Importante:</strong> en el extranjero, las compañías de
            alquiler de autos no permiten el uso de tarjetas de crédito de
            terceros.
          </div>
        </div>

        {/* Protecciones */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
            <h2 className={styles.sectionTitle}>Protecciones incluidas</h2>
          </div>
          <div className={styles.proteccionesGrid}>
            <div className={styles.proteccionCard}>
              <h3>Protección del Vehículo</h3>
              <p>Cobertura contra daños al auto alquilado</p>
            </div>
            <div className={styles.proteccionCard}>
              <h3>Protección Contra Terceros</h3>
              <p>Cobertura de responsabilidad civil</p>
            </div>
            <div className={styles.proteccionCard}>
              <h3>Protección Contra Robos</h3>
              <p>Cobertura en caso de robo del vehículo</p>
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FontAwesomeIcon icon={faCreditCard} className={styles.icon} />
            <h2 className={styles.sectionTitle}>Métodos de pago aceptados</h2>
          </div>
          <div className={styles.paymentInfo}>
            <p>
              Aceptamos tarjetas de crédito internacionales (Visa, Mastercard,
              American Express)
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Preguntas frecuentes</h2>
          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.pregunta}</span>
                  <FontAwesomeIcon
                    icon={openFaq === index ? faChevronUp : faChevronDown}
                    className={styles.faqIcon}
                  />
                </button>
                <div
                  className={`${styles.faqAnswer} ${
                    openFaq === index ? styles.open : ""
                  }`}
                >
                  <p>{faq.respuesta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h2>¿Listo para reservar?</h2>
          <p>Encuentra el vehículo perfecto para tu próximo viaje</p>
          <button className={styles.ctaButton}>
            Ver vehículos disponibles
          </button>
        </div>
      </section>
    </>
  );
}
