import { useState } from "react";
import "./MyPastReservations.css";
import "../MyReservations/MyReservations.css";
import { FaHistory, FaStar } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPricetagSharp } from "react-icons/io5";
import { TbTax } from "react-icons/tb";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";

export default function MyPastReservations() {
  const [pastReservations, setPastReservations] = useState([
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

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRate = (id) => {
    alert(`Reserva ${id} lista para calificar (funcionalidad futura).`);
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
                      onClick={() => handleRate(res.id)}
                    >
                      <FaStar /> Calificar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
