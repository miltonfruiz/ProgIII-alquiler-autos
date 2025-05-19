import { useState } from "react";
import "./MyReservations.css";
import { FaCarSide } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function MyReservations() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      auto: "Toyota Corolla",
      fecha: "2025-06-12",
      imagen: "/images/volkswagen.png",
      detalles:
        "Reserva con seguro completo, kilometraje libre y asistencia 24hs.",
    },
    {
      id: 2,
      auto: "Peugeot 208",
      fecha: "2025-07-01",
      imagen: "/images/volkswagen.png",
      detalles: "Incluye GPS, seguro parcial y límite de 300 km diarios.",
    },
    {
      id: 3,
      auto: "Volkswagen Gol",
      fecha: "2025-07-15",
      imagen: "/images/volkswagen.png",
      detalles: "Auto económico. Ideal para viajes cortos dentro de la ciudad.",
    },
    {
      id: 4,
      auto: "Toyota Corolla",
      fecha: "2025-06-12",
      imagen: "/images/volkswagen.png",
      detalles:
        "Reserva con seguro completo, kilometraje libre y asistencia 24hs.",
    },
    {
      id: 5,
      auto: "Peugeot 208",
      fecha: "2025-07-01",
      imagen: "/images/volkswagen.png",
      detalles: "Incluye GPS, seguro parcial y límite de 300 km diarios.",
    },
    {
      id: 6,
      auto: "Volkswagen Gol",
      fecha: "2025-07-15",
      imagen: "/images/volkswagen.png",
      detalles: "Auto económico. Ideal para viajes cortos dentro de la ciudad.",
    },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);
  const handleDelete = (id) => {
    const nuevasReservas = reservations.filter((res) => res.id !== id);
    setReservations(nuevasReservas);
  };
  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  return (
    <div className="reservation-container">
      <h1 className="reservation-title">
        <FaCarSide className="car-myreservations" />
        Mis Reservas
      </h1>
      <div className="reservation-scroll-wrapper">
        <div className="reservation-list">
          {reservations.length === 0 ? (
            <p className="no-reservations">No hay reservas activas.</p>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id}
                className={`reservation-card myreservations-fade-in ${
                  expandedCard === res.id ? "expanded" : ""
                }`}
              >
                <img src={res.imagen} alt={res.auto} className="car-image" />
                <div className="reservation-info">
                  <h2>{res.auto}</h2>
                  <p>
                    <MdDateRange className="data-myreservations" />
                    Fecha: {new Date(res.fecha).toLocaleDateString("es-AR")}
                  </p>
                  {expandedCard === res.id && (
                    <div className="extra-details">
                      <p>{res.detalles}</p>
                    </div>
                  )}
                  <div className="reservation-actions">
                    <button
                      className="toggle-details-button"
                      onClick={() => toggleExpand(res.id)}
                    >
                      {expandedCard === res.id ? (
                        <>
                          <IoIosArrowUp /> Ver menos
                        </>
                      ) : (
                        <>
                          <IoIosArrowDown /> Más info
                        </>
                      )}
                    </button>
                    <button
                      className="delete-myreservations"
                      onClick={() => handleDelete(res.id)}
                    >
                      <RiDeleteBin6Line /> Cancelar
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
