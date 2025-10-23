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
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { toast } from "react-toastify";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { t } = useTranslation();
  const handleDelete = async (id_reserva) => {
    try {
      const res = await fetch(`http://localhost:3000/reservas/${id_reserva}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al cancelar la reserva");
      }

      setReservations((prev) =>
        prev.filter((res) => res.id_reserva !== id_reserva)
      );
      toast.success("Reserva eliminada!");
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      alert("No se pudo cancelar la reserva.");
    }
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
        console.log("Reservas recibidas:", data);
        setReservations(Array.isArray(data) ? data : data.reservas || []);
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
      <h3 className="reservation-title">{t("navbar.myReservations")}</h3>
      <h6 className="reservation-subtitle">{t("navbar.stay")}</h6>
      <div className="reservation-scroll-wrapper">
        <div className="reservation-list">
          {reservations.length === 0 ? (
            <p className="no-reservations">{t("navbar.noActive")}.</p>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id_reserva}
                className={`reservation-card myreservations-fade-in ${
                  expandedIds.includes(res.id) ? "expanded" : ""
                }`}
              >
                <img
                  src={`http://localhost:3000${res.Car.image}`}
                  alt={res.Car?.name}
                  className="car-image"
                />
                <div className="reservation-info">
                  <h2>{res.Car?.name}</h2>
                  <p>
                    <MdDateRange className="data-myreservations" size={20} />
                    <span>
                      {new Date(res.fecha_inicio).toLocaleDateString("es-AR")} -
                    </span>
                    <span>
                      {new Date(res.fecha_fin).toLocaleDateString("es-AR")}
                    </span>
                  </p>

                  <div className="extra-details">
                    <p>
                      <IoPricetagSharp /> Días: {res.cant_dias}
                    </p>
                    <p>
                      <TbTax /> Impuestos: $ ${res.tax.toLocaleString()}
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
                      <BsCashCoin /> Total: $ ${res.total.toLocaleString()}
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
          {showConfirmModal && reservationToDelete && (
            <ConfirmDeleteModal
              itemName={reservationToDelete.Car?.name || "la reserva"}
              itemType="la reserva"
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
      </div>
    </div>
  );
}
