import { useState, useEffect } from "react";
import "./MyReservations.css";
import { FaCarSide, FaHandHoldingUsd } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPricetagSharp } from "react-icons/io5";
import { TbTax } from "react-icons/tb";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";
import { useLocation } from "react-router-dom";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const handleDelete = (id) => {
    const nuevasReservas = reservations.filter((res) => res.id !== id);
    setReservations(nuevasReservas);
  };
  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (!loggedUser?.id) return;

        const res = await fetch(
          `http://localhost:3000/reservas/user/${loggedUser.id}`
        );
        const data = await res.json();
        setReservations(data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    fetchReservations();
  }, []);
  const datosAlquiler = JSON.parse(localStorage.getItem("datosAlquiler"));
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#my-reservations-link") {
      setTimeout(() => {
        const element = document.getElementById("my-reservations-link");
        if (element) {
          const navbarHeight = 90;
          const elementRect = element.getBoundingClientRect();
          const elementTop = elementRect.top + window.scrollY;
          const elementHeight = elementRect.height;
          const viewportHeight = window.innerHeight;
          const offset =
            elementTop -
            (viewportHeight - elementHeight) / 2 +
            navbarHeight / 2;
          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  }, [location]);
  return (
    <div id="my-reservations-link" className="reservation-container">
      <h1 className="reservation-title">
        <FaCarSide className="car-myreservations" />
        Mis Reservas
      </h1>
      <h6 className="reservation-subtitle">
        Mantente al tanto de tus reservas
      </h6>
      <div className="reservation-scroll-wrapper">
        <div className="reservation-list">
          {reservations.length === 0 ? (
            <p className="no-reservations">No hay reservas activas.</p>
          ) : (
            reservations.map((res) => (
              <div
                className={`reservation-card myreservations-fade-in ${
                  expandedIds.includes(res.id) ? "expanded" : ""
                }`}
              >
                <img
                  src={res.Car?.image || "/images/default.png"}
                  alt={res.Car?.name}
                  className="car-image"
                />
                <div className="reservation-info">
                  <h2>{res.Car?.name}</h2>
                  <p>
                    <MdDateRange className="data-myreservations" />
                    Desde:{" "}
                    {new Date(res.fecha_inicio).toLocaleDateString("es-AR")} -
                    Hasta: {new Date(res.fecha_fin).toLocaleDateString("es-AR")}
                  </p>

                  <div className="extra-details">
                    <p>
                      <IoPricetagSharp /> Días: {res.cant_dias}
                    </p>
                    <p>
                      <TbTax /> Impuestos: $
                      {typeof datosAlquiler.tax === "number"
                        ? datosAlquiler.tax.toLocaleString()
                        : "N/A"}
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
                      <BsCashCoin /> Total: $
                      {typeof datosAlquiler.total === "number"
                        ? datosAlquiler.total.toLocaleString()
                        : "N/A"}
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
