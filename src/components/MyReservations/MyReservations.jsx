import { useState } from "react";
import "./MyReservations.css";
import { FaCarSide } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function MyReservations() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      auto: "Toyota Corolla",
      fecha: "2025-06-12",
      imagen: "/images/volkswagen.png",
    },
    {
      id: 2,
      auto: "Toyota Corolla",
      fecha: "2025-07-01",
      imagen: "/images/volkswagen.png",
    },
    {
      id: 3,
      auto: "Toyota Corolla",
      fecha: "2025-07-01",
      imagen: "/images/volkswagen.png",
    },
    {
      id: 4,
      auto: "Toyota Corolla",
      fecha: "2025-06-12",
      imagen: "/images/volkswagen.png",
    },
    {
      id: 5,
      auto: "Toyota Corolla",
      fecha: "2025-07-01",
      imagen: "/images/volkswagen.png",
    },
    {
      id: 6,
      auto: "Toyota Corolla",
      fecha: "2025-07-01",
      imagen: "/images/volkswagen.png",
    },
  ]);
  const handleDelete = (id) => {
    const nuevasReservas = reservations.filter((res) => res.id !== id);
    setReservations(nuevasReservas);
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
                className="reservation-card myreservations-fade-in"
              >
                <img src={res.imagen} alt={res.auto} className="car-image" />
                <div className="reservation-info">
                  <h2>{res.auto}</h2>
                  <p>
                    <MdDateRange className="data-myreservations" />
                    Fecha: {new Date(res.fecha).toLocaleDateString("es-AR")}
                  </p>
                </div>
                <button
                  className="delete-myreservations"
                  onClick={() => handleDelete(res.id)}
                >
                  <RiDeleteBin6Line /> Cancelar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
