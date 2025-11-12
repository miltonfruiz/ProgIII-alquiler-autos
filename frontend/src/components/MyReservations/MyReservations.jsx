import { useState, useEffect } from "react";
import "./MyReservations.css";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPricetagSharp } from "react-icons/io5";
import { TbTax } from "react-icons/tb";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = async (id_reserva) => {
    try {
      const res = await fetch(`http://localhost:3000/reservas/${id_reserva}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al cancelar la reserva");
      }

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id_reserva !== id_reserva)
      );

      alert("Reserva eliminada exitosamente!");
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      alert("No se pudo cancelar la reserva.");
    }
  };

  const toggleExpand = (id_reserva) => {
    setExpandedIds((prev) =>
      prev.includes(id_reserva)
        ? prev.filter((item) => item !== id_reserva)
        : [...prev, id_reserva]
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
        console.log("Reservas recibidas:", data);
        setReservations(Array.isArray(data) ? data : data.reservas || []);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div id="my-reservations-link" className="reservation-container">
      <h3 className="reservation-title">Mis Reservas</h3>
      <h6 className="reservation-subtitle">Gestiona tus reservas activas</h6>

      <div className="reservation-scroll-wrapper">
        <div className="reservation-list">
          {reservations.length === 0 ? (
            <p className="no-reservations">No tienes reservas activas.</p>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id_reserva}
                className={`reservation-card myreservations-fade-in ${
                  expandedIds.includes(res.id_reserva) ? "expanded" : ""
                }`}
              >
                <img
                  src={`http://localhost:3000${res.Car?.image}`}
                  alt={res.Car?.name}
                  className="car-image"
                />
                <div className="reservation-info">
                  <h2>{res.Car?.name}</h2>
                  <p>
                    <MdDateRange className="data-myreservations" size={20} />
                    <span>
                      {new Date(
                        res.fecha_inicio + "T00:00:00"
                      ).toLocaleDateString("es-AR")}{" "}
                      -
                    </span>
                    <span>
                      {new Date(res.fecha_fin + "T00:00:00").toLocaleDateString(
                        "es-AR"
                      )}
                    </span>
                  </p>

                  <div className="extra-details">
                    <p>
                      <IoPricetagSharp /> Días: {res.cant_dias}
                    </p>
                    <p>
                      <TbTax /> Impuestos: ${res.tax?.toLocaleString()}
                    </p>
                    <p>
                      <FaHandHoldingUsd />
                      Método de pago:
                      <span>{res.metodoPago}</span>
                    </p>
                    <p>
                      <HiDocumentCurrencyDollar />
                      Tipo de facturación: {res.facturacion}
                    </p>
                    <p>
                      <BsCashCoin /> Total: ${res.total?.toLocaleString()}
                    </p>
                  </div>

                  <div className="reservation-actions">
                    <button
                      onClick={() => toggleExpand(res.id_reserva)}
                      className="toggle-details-button"
                    >
                      {expandedIds.includes(res.id_reserva) ? (
                        <>
                          <IoIosArrowUp /> Ocultar detalles
                        </>
                      ) : (
                        <>
                          <IoIosArrowDown /> Ver detalles
                        </>
                      )}
                    </button>
                    <button
                      className="delete-myreservations"
                      onClick={() => {
                        setReservationToDelete(res);
                        setShowConfirmModal(true);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showConfirmModal && reservationToDelete && (
        <ConfirmDeleteModal
          itemName={reservationToDelete.Car?.name || "la reserva"}
          onConfirm={() => {
            handleDelete(reservationToDelete.id_reserva);
            setReservationToDelete(null);
            setShowConfirmModal(false);
          }}
          onCancel={() => {
            setReservationToDelete(null);
            setShowConfirmModal(false);
          }}
        />
      )}
    </div>
  );
}
