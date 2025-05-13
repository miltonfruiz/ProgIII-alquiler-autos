import { useState } from "react";
import "./MyReservations.css";

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
  ]);
  const handleDelete = (id) => {
    const nuevasReservas = reservations.filter((res) => res.id !== id);
    setReservations(nuevasReservas);
  };
  return (
    <div>
      <h1>Mis Reservas</h1>
      <div>
        {reservations.length === 0 ? (
          <p>No hay reservas activas.</p>
        ) : (
          reservations.map((res) => (
            <div key={res.id}>
              <img src={res.imagen} alt={res.auto} />
              <div>
                <h2>{res.auto}</h2>
                <p>Fecha: {new Date(res.fecha).toLocaleDateString("es-AR")}</p>
              </div>
              <button onClick={() => handleDelete(res.id)}>Cancelar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
