import { useState, useRef, useEffect, use } from "react";
import "./MyPastReservations.css";
import "../MyReservations/MyReservations.css";
import { FaHistory, FaHandHoldingUsd, FaStar } from "react-icons/fa";
import { MdDateRange, MdOutlineCancel } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import ModalValidation from "../ModalValidation/ModalValidation";
import { useTranslation } from "react-i18next";

export default function MyPastReservations() {
  const [ratings, setRatings] = useState({});
  const [modalReservaId, setModalReservaId] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const commentRef = useRef(null);
  const starsRef = useRef(null);
  const [modalErrores, setModalErrores] = useState({});
  const { t } = useTranslation();

  const [pastReservations, setPastReservations] = useState([]);

  const [loading, setLoading] = useState(true);

  //Fetch para reservas pasadas
  useEffect(() => {
    const fetchPastReservations = async () => {
      try {
        setLoading(true);
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        const res = await fetch(
          `http://localhost:3000/reservas/past/user/${loggedUser.id}`,
        );
        if (!res.ok) {
          throw new Error("Error al obtener reservas pasadas");
        }

        const data = await res.json();
        console.log("Reservas pasadas obtenidas:", data);
        setPastReservations(data);
      } catch (error) {
        console.error("Error al obtener reservas pasadas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastReservations();
  }, []);

  const isRated = (id) => {
    return ratings[id]?.stars > 0 && ratings[id]?.comment?.trim().length > 0;
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
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

  const handleRating = async (reservaId, formData) => {
    const errorValidation = ModalValidation({ datos: formData });
    if (Object.keys(errorValidation).length > 0) {
      if (errorValidation.comment && commentRef.current) {
        commentRef.current.focus();
      } else if (errorValidation.stars && starsRef.current) {
        starsRef.current.focus();
      }
      setModalErrores((prev) => ({
        ...prev,
        [reservaId]: errorValidation,
      }));
      return;
    }

    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const fullName = loggedUser
        ? `${loggedUser.nombre} ${loggedUser.apellido}`.trim()
        : "Usuario Anónimo";

      // Buscar la reserva específica
      const reservation = pastReservations.find((r) => r.id === reservaId);

      if (!reservation || !reservation.carId) {
        toast.error("No se pudo encontrar el auto asociado a la reserva");
        return;
      }

      const payLoad = {
        carId: reservation.carId,
        userId: loggedUser.id,
        username: fullName,
        rating: formData.stars,
        comment: formData.comment,
      };

      console.log("Payload enviado:", payLoad);

      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad),
      });

      // Obtener la respuesta del servidor
      const data = await response.json();

      if (!response.ok) {
        console.error("Error del servidor:", data);
        throw new Error(data.error || "Error al enviar la valoración");
      }

      toast.success("¡Gracias por tu calificación!");
      setRatings((prev) => ({
        ...prev,
        [reservaId]: {
          ...prev[reservaId],
          stars: formData.stars,
          comment: formData.comment,
          showForm: false,
        },
      }));
      setModalReservaId(null);
      setModalErrores((prev) => ({
        ...prev,
        [reservaId]: {},
      }));
    } catch (error) {
      console.error("Error completo:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="pastReservation-container">
      <h1 className="reservation-title">{t("navbar.myPastReservations")}</h1>
      <h6 className="reservation-subtitle">{t("navbar.check")}</h6>
      <div>
        {loading ? (
          <div className="loading-spinner">Cargando...</div>
        ) : (
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
                    <img
                      src={res.imagen}
                      alt={res.auto}
                      className="car-image"
                    />
                    <div className="reservation-info">
                      <h4>{res.auto}</h4>
                      <p>
                        <MdDateRange className="data-myreservations" />
                        Fecha: {new Date(res.fecha).toLocaleDateString("es-AR")}
                      </p>

                      <div className="reservation-actions">
                        {isRated(res.id) ? (
                          <button className="rated-button" disabled>
                            <FaStar className="icon-disabled" />
                            Ya has calificado el auto
                          </button>
                        ) : (
                          <button
                            className="toggle-rate-button"
                            onClick={() => setModalReservaId(res.id)}
                          >
                            <FaStar /> {t("navbar.buttonRating")}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {modalReservaId && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="calification-group">
                      <h2 className="calification-title">
                        Calificar{" "}
                        {
                          pastReservations.find((r) => r.id === modalReservaId)
                            ?.auto
                        }
                      </h2>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <FaStar
                            ref={starsRef}
                            key={value}
                            onClick={() =>
                              handleStarClick(modalReservaId, value)
                            }
                            className={`star-icon ${
                              value <= (ratings[modalReservaId]?.stars || 0)
                                ? "selected"
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`error-input ${
                          modalErrores[modalReservaId]?.stars ? "visible" : ""
                        }`}
                      >
                        {modalErrores[modalReservaId]?.stars || ""}
                      </span>
                    </div>

                    <textarea
                      ref={commentRef}
                      placeholder="Ingrese comentario..."
                      value={ratings[modalReservaId]?.comment || ""}
                      onChange={(e) =>
                        handleCommentChange(modalReservaId, e.target.value)
                      }
                    />
                    <span
                      className={`error-input ${
                        modalErrores[modalReservaId]?.comment ? "visible" : ""
                      }`}
                    >
                      {modalErrores[modalReservaId]?.comment || ""}
                    </span>

                    <div className="modal-actions">
                      <button
                        onClick={() =>
                          handleRating(modalReservaId, {
                            stars: ratings[modalReservaId]?.stars || 0,
                            comment: ratings[modalReservaId]?.comment || "",
                          })
                        }
                        className="submit-rating-button"
                      >
                        Calificar
                      </button>
                      <button
                        className="cancel-rating-button"
                        onClick={() => {
                          setModalReservaId(null);
                          setModalErrores((prev) => ({
                            ...prev,
                            [modalReservaId]: {},
                          }));
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </div>
  );
}
