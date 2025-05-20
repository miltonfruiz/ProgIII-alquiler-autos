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
    {
      id: 3,
      auto: "Chevrolet Onix",
      fecha: "2024-10-10",
      imagen: "/images/onix.png",
      precio: 24000,
      impuestos: 5100,
      metodoPago: "Mercado Pago",
      facturacion: "Factura B",
      total: 29100,
    },
    {
      id: 4,
      auto: "Volkswagen Gol",
      fecha: "2024-09-05",
      imagen: "/images/gol.png",
      precio: 21000,
      impuestos: 4300,
      metodoPago: "Efectivo",
      facturacion: "Factura C",
      total: 25300,
    },
    {
      id: 5,
      auto: "Toyota Etios",
      fecha: "2024-08-25",
      imagen: "/images/etios.png",
      precio: 26000,
      impuestos: 5500,
      metodoPago: "Tarjeta de crédito",
      facturacion: "Factura A",
      total: 31500,
    },
    {
      id: 6,
      auto: "Fiat Cronos",
      fecha: "2024-07-15",
      imagen: "/images/cronos.png",
      precio: 23000,
      impuestos: 4800,
      metodoPago: "Transferencia",
      facturacion: "Factura B",
      total: 27800,
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

                <div>
                  <button>Ver detalles</button>
                  <button>Calificar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
