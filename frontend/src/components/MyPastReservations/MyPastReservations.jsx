import { useState, useRef } from "react";
import "./MyPastReservations.css";
import "../MyReservations/MyReservations.css";
import { FaHistory, FaHandHoldingUsd, FaStar } from "react-icons/fa";
import { MdDateRange, MdOutlineCancel } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPricetagSharp, IoSend } from "react-icons/io5";
import { TbTax } from "react-icons/tb";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import ModalValidation from "../ModalValidation/ModalValidation";
import { useTranslation } from "react-i18next";

export default function MyPastReservations() {
  const [pastReservations] = useState([
    {
      id: 1,
      auto: "Chevrolet Prisma",
      fecha: "2024-12-01",
      imagen: "/images/cars/chevroletPrisma.png",
      precio: 28000,
      impuestos: 5900,
      metodoPago: "Tarjeta de débito",
      facturacion: "Factura A",
      total: 33900,
    },
    {
      id: 2,
      auto: "Fiat Cronos",
      fecha: "2024-11-15",
      imagen: "/images/cars/fiat-cronos.png",
      precio: 22000,
      impuestos: 4600,
      metodoPago: "Transferencia",
      facturacion: "Factura B",
      total: 26600,
    },
    {
      id: 3,
      auto: "Peugeot 208",
      fecha: "2024-10-10",
      imagen: "/images/cars/peugeot208.png",
      precio: 24000,
      impuestos: 5100,
      metodoPago: "Mercado Pago",
      facturacion: "Factura B",
      total: 29100,
    },
  ]);
  const [ratings, setRatings] = useState({});
  const [modalReservaId, setModalReservaId] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const commentRef = useRef(null);
  const starsRef = useRef(null);
  const [modalErrores, setModalErrores] = useState({});
  const { t } = useTranslation();

  const isRated = (id) => {
    return ratings[id]?.stars > 0 && ratings[id]?.comment?.trim().length > 0;
  };
  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleStarClick = (id, value) => {
    setRatings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        stars: value,
      },
    }));
  };
  const handleCommentChange = (id, text) => {
    setRatings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        comment: text,
      },
    }));
  };
  const handleRating = (id, formData) => {
    const errorValidation = ModalValidation({ datos: formData });
    if (Object.keys(errorValidation).length > 0) {
      if (errorValidation.comment && commentRef.current) {
        commentRef.current.focus();
      } else if (errorValidation.stars && starsRef.current) {
        starsRef.current.focus();
      }
      setModalErrores((prev) => ({
        ...prev,
        [id]: errorValidation,
      }));
      return;
    }
    toast.success("¡Gracias por tu calificación!");
    setRatings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        stars: formData.stars,
        comment: formData.comment,
        showForm: false,
      },
    }));
    setModalReservaId(null);
    setModalErrores((prev) => ({
      ...prev,
      [id]: {},
    }));
  };
  return (
    <div className="pastReservation-container">
      <h1 className="reservation-title">{t("navbar.myPastReservations")}</h1>
      <h6 className="reservation-subtitle">{t("navbar.check")}</h6>
      <div className="reservation-scroll-wrapper">
        <div className="reservation-list">
          {pastReservations.length === 0 ? (
            <p className="no-reservations">No hay reservas finalizadas.</p>
          ) : (
            pastReservations.map((res) => (
              <div
                key={res.id}
                className={`reservation-card myreservations-fade-in ${
                  expandedIds.includes(res.id) ? "expanded" : ""
                }`}
              >
                <img src={res.imagen} alt={res.auto} className="car-image" />
                <div className="reservation-info">
                  <h4>{res.auto}</h4>
                  <p>
                    <MdDateRange className="data-myreservations" />
                    Fecha: {new Date(res.fecha).toLocaleDateString("es-AR")}
                  </p>
                  <div className="extra-details">
                    <p>
                      <IoPricetagSharp />
                      Precio base: ${res.precio.toLocaleString()}
                    </p>
                    <p>
                      <TbTax /> Impuestos: ${res.impuestos.toLocaleString()}
                    </p>
                    <p>
                      <FaHandHoldingUsd />
                      Método de pago: {res.metodoPago}
                    </p>
                    <p>
                      <HiDocumentCurrencyDollar />
                      Tipo de facturación: {res.facturacion}
                    </p>
                    <p>
                      <BsCashCoin /> Total: ${res.total.toLocaleString()}
                    </p>
                  </div>
                  <div className="reservation-actions">
                    <button
                      onClick={() => toggleExpand(res.id)}
                      className="toggle-details-button"
                    >
                      {expandedIds.includes(res.id) ? (
                        <>
                          <IoIosArrowUp /> {t("navbar.buttonHide")}
                        </>
                      ) : (
                        <>
                          <IoIosArrowDown /> {t("navbar.buttonSeeDetails")}
                        </>
                      )}
                    </button>
                    {isRated(res.id) ? (
                      <button className="rated-button" disabled>
                        <FaStar className="icon-disabled" />
                        Ya has calificado el auto
                      </button>
                    ) : (
                      <button
                        className="toggle-rate-button"
                        onClick={() => setModalReservaId(res.id)}
                      >
                        <FaStar /> {t("navbar.buttonRating")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {modalReservaId && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="calification-group">
                  <h2 className="calification-title">
                    Calificar{" "}
                    {
                      pastReservations.find((r) => r.id === modalReservaId)
                        ?.auto
                    }
                  </h2>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        ref={starsRef}
                        key={value}
                        onClick={() => handleStarClick(modalReservaId, value)}
                        className={`star-icon ${
                          value <= (ratings[modalReservaId]?.stars || 0)
                            ? "selected"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`error-input ${
                      modalErrores[modalReservaId]?.stars ? "visible" : ""
                    }`}
                  >
                    {modalErrores[modalReservaId]?.stars || ""}
                  </span>
                </div>

                <textarea
                  ref={commentRef}
                  placeholder="Ingrese comentario..."
                  value={ratings[modalReservaId]?.comment || ""}
                  onChange={(e) =>
                    handleCommentChange(modalReservaId, e.target.value)
                  }
                />
                <span
                  className={`error-input ${
                    modalErrores[modalReservaId]?.comment ? "visible" : ""
                  }`}
                >
                  {modalErrores[modalReservaId]?.comment || ""}
                </span>

                <div className="modal-actions">
                  <button
                    onClick={() =>
                      handleRating(modalReservaId, {
                        stars: ratings[modalReservaId]?.stars || 0,
                        comment: ratings[modalReservaId]?.comment || "",
                      })
                    }
                    className="submit-rating-button"
                  >
                    Calificar
                  </button>
                  <button
                    className="cancel-rating-button"
                    onClick={() => {
                      setModalReservaId(null);
                      setModalErrores((prev) => ({
                        ...prev,
                        [modalReservaId]: {},
                      }));
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}
