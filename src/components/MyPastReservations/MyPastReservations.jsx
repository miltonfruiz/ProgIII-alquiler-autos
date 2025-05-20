import { useState } from "react";
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

export default function MyPastReservations() {
  const [pastReservations] = useState([
    {
      id: 1,
      auto: "Renault Logan",
      fecha: "2025-04-10",
      imagen: "/images/volkswagen.png",
      precio: 25000,
      impuestos: 4500,
      metodoPago: "Tarjeta de débito",
      facturacion: "Factura A",
      total: 29500,
    },
    {
      id: 2,
      auto: "Fiat Cronos",
      fecha: "2025-03-22",
      imagen: "/images/volkswagen.png",
      precio: 32000,
      impuestos: 6500,
      metodoPago: "Mercado Pago",
      facturacion: "Factura B",
      total: 38500,
    },
  ]);
  const [ratings, setRatings] = useState({});
  const [modalReservaId, setModalReservaId] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const toggleRating = (id) => {
    setRatings((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { stars: 0, comment: "", showForm: false }),
        showForm: !prev[id]?.showForm,
      },
    }));
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
  const submitRating = (id) => {
    const { stars, comment } = ratings[id];
    toast.success("¡Gracias por tu calificación!");
    setRatings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showForm: false,
      },
    }));
  };
  return (
    <div className="reservation-container">
      <h1 className="reservation-title">
        <FaHistory className="history-mypastreservations" />
        Reservas Finalizadas
      </h1>
      <h6 className="reservation-subtitle">
        Consulta y califica tus reservas anteriores
      </h6>
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
                  <h2>{res.auto}</h2>
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
                          <IoIosArrowUp /> Ocultar info
                        </>
                      ) : (
                        <>
                          <IoIosArrowDown /> Ver detalles
                        </>
                      )}
                    </button>
                    <button
                      className="toggle-rate-button"
                      onClick={() => setModalReservaId(res.id)}
                    >
                      <FaStar /> Calificar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {modalReservaId && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>
                  Calificar:{" "}
                  {
                    pastReservations.find((res) => res.id === modalReservaId)
                      ?.auto
                  }
                </h2>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
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
                <textarea
                  placeholder="Ingrese comentario..."
                  value={ratings[modalReservaId]?.comment || ""}
                  onChange={(e) =>
                    handleCommentChange(modalReservaId, e.target.value)
                  }
                />
                <div className="modal-actions">
                  <button
                    className="submit-rating-button"
                    onClick={() => {
                      submitRating(modalReservaId);
                      setModalReservaId(null);
                    }}
                  >
                    <IoSend /> Enviar
                  </button>
                  <button
                    className="cancel-rating-button"
                    onClick={() => setModalReservaId(null)}
                  >
                    <MdOutlineCancel /> Cancelar
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
