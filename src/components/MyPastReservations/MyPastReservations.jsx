import { useState } from "react";

export default function MyPastReservations() {
  const [pastReservations] = useState([
    {
      id: 1,
      auto: "Renault Logan",
      fecha: "2024-12-01",
      imagen: "/images/renault.png",
      precio: 28000,
      impuestos: 5900,
      metodoPago: "Tarjeta de débito",
      facturacion: "Factura A",
      total: 33900,
    },
    {
      id: 2,
      auto: "Ford Fiesta",
      fecha: "2024-11-15",
      imagen: "/images/ford.png",
      precio: 22000,
      impuestos: 4600,
      metodoPago: "Transferencia",
      facturacion: "Factura B",
      total: 26600,
    },
  ]);

  return (
    <div>
      <h1>Reservas Finalizadas</h1>
      <h6>Consulta el historial de tus reservas completadas</h6>
      <div>
        {pastReservations.length === 0 ? (
          <p>No tienes reservas anteriores.</p>
        ) : (
          pastReservations.map((res) => (
            <div key={res.id}>
              <img src={res.imagen} alt={res.auto} />
              <div>
                <h2>{res.auto}</h2>
                <p>Fecha: {new Date(res.fecha).toLocaleDateString("es-AR")}</p>
                <p>Precio base: ${res.precio.toLocaleString()}</p>
                <p>Impuestos: ${res.impuestos.toLocaleString()}</p>
                <p>Método de pago: {res.metodoPago}</p>
                <p>Facturación: {res.facturacion}</p>
                <p>Total: ${res.total.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
