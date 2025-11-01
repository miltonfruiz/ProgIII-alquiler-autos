import React, { useState, useRef, useMemo } from "react";
import styles from "./Modal.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalValidation from "../ModalValidation/ModalValidation";
import { crearReserva } from "../../api/reservas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleInfo,
  faChevronDown,
  faCheck,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

function Modal({ auto, onClose }) {
  if (!auto) return null;

  const navigate = useNavigate();
  const hoy = new Date().toISOString().split("T")[0];

  // Calcular hora mínima (una hora después de ahora)
  const getHoraMinima = () => {
    const ahora = new Date();
    ahora.setHours(ahora.getHours() + 1);
    return `${ahora.getHours().toString().padStart(2, "0")}:00`;
  };

  const [formData, setFormData] = useState({
    fecha_inicio: hoy,
    fecha_fin: hoy,
    hora_inicio: getHoraMinima(),
    hora_fin: getHoraMinima(),
    lugar_retiro: "airport",
    lugar_devolucion: "",
  });

  const [errores, setErrores] = useState({});

  const fecha_inicioRef = useRef(null);
  const fecha_finRef = useRef(null);
  const horario_inicioRef = useRef(null);
  const horario_finRef = useRef(null);

  // Función para formatear fecha y hora en español
  const formatearFechaHora = (fecha, hora) => {
    if (!fecha || !hora) return "Selecciona fecha y hora";

    const meses = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ];

    const fechaObj = new Date(fecha + "T00:00:00");
    const dia = fechaObj.getDate();
    const mes = meses[fechaObj.getMonth()];
    const anio = fechaObj.getFullYear();

    // Convertir hora de 24h a 12h con AM/PM
    const [horas, minutos] = hora.split(":");
    const horasNum = parseInt(horas);
    const periodo = horasNum >= 12 ? "PM" : "AM";
    const horas12 =
      horasNum === 0 ? 12 : horasNum > 12 ? horasNum - 12 : horasNum;

    return `${dia}/${mes}/${anio} a las ${horas12}:${minutos} ${periodo}`;
  };

  // Nombres de lugares
  const nombresLugares = {
    airport: 'Aeropuerto de Rosario "Islas Malvinas"',
    downtown: "Centro de Rosario - Sucursal Principal",
    busStation: "Terminal de Ómnibus Mariano Moreno",
    other: "Otra ubicación",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newData = { ...formData, [name]: value };

    // Si cambia la fecha de inicio y es posterior a la fecha fin, actualizar fecha fin
    if (name === "fecha_inicio" && value > formData.fecha_fin) {
      newData.fecha_fin = value;
    }

    // Si cambia la fecha de inicio a hoy, verificar que la hora sea válida
    if (name === "fecha_inicio" && value === hoy) {
      const ahora = new Date();
      const horaMinima = getHoraMinima();

      if (formData.hora_inicio < horaMinima) {
        newData.hora_inicio = horaMinima;
      }
    }

    // Si la fecha de inicio cambia a una fecha futura, permitir cualquier hora
    if (name === "fecha_inicio" && value > hoy) {
      // No hace falta ajustar la hora
    }

    // Validar en tiempo real
    const newErrores = ModalValidation(newData);
    setErrores(newErrores);
    setFormData(newData);
  };

  const calcularTotal = () => {
    if (
      Object.keys(errores).length > 0 ||
      !formData.fecha_inicio ||
      !formData.fecha_fin
    )
      return 0;

    const inicio = new Date(formData.fecha_inicio);
    const fin = new Date(formData.fecha_fin);

    // Normalizar fechas sin horas
    const fechaInicio = new Date(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate()
    );
    const fechaFin = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate());

    const diffDias = Math.floor(
      (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24)
    );

    return diffDias > 0 ? diffDias * auto.price : 0;
  };

  const calcularImpuestos = (total) => {
    return total * 0.21;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario completo
    const erroresModal = ModalValidation(formData);

    if (Object.keys(erroresModal).length > 0) {
      setErrores(erroresModal);
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;

    if (!userId) {
      toast.error("Debes iniciar sesión para hacer una reserva");
      return;
    }

    try {
      const total = calcularTotal();
      const impuestos = calcularImpuestos(total);
      const precioFinal = total + impuestos;

      const { success } = await crearReserva({
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
        carId: auto.id,
        lugar_devolucion: formData.lugar_devolucion,
        total: total,
        tax: impuestos,
        userId,
      });

      if (success) {
        // Contador de reservas
        let contador = localStorage.getItem("contadorReservas");
        contador = contador ? parseInt(contador) : 0;
        contador++;
        localStorage.setItem("contadorReservas", contador);

        // Guardar datos en localStorage
        const datosAlquiler = {
          auto: auto,
          fecha_inicio: formData.fecha_inicio,
          fecha_fin: formData.fecha_fin,
          hora_inicio: formData.hora_inicio,
          hora_fin: formData.hora_fin,
          lugar_retiro: formData.lugar_retiro,
          lugar_devolucion: formData.lugar_devolucion,
          total: total,
          tax: impuestos,
          totalFinal: precioFinal,
        };

        localStorage.setItem("datosAlquiler", JSON.stringify(datosAlquiler));

        toast.success("¡Fechas seleccionadas correctamente!");
        setErrores({});

        setTimeout(() => {
          navigate("/carPayment");
        }, 2000);
      } else {
        toast.error("No se pudo crear la reserva. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      toast.error("Error del servidor al crear la reserva.");
    }
  };

  const total = calcularTotal();
  const impuestos = calcularImpuestos(total);
  const precioFinal = total + impuestos;

  return (
    <div
      className={styles.overlayBack}
      onClick={() => {
        localStorage.removeItem("datosAlquiler");
        onClose();
      }}
    >
      <div
        className={styles.overlayConteiner}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.overlayContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.overlayTitle}>Reserva</h3>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.leftPanel}>
              <div className={styles.carReserva}>
                <span className={styles.reservaInfo}>
                  Auto a reservar
                  <p className={styles.carSelected}>
                    {auto.name} | ARS ${auto.price.toLocaleString()} / Día
                  </p>
                </span>
                <div className={styles.carImage}>
                  <div className={styles.imagePlaceholder}>
                    <img
                      src={`http://localhost:3000${auto.image}`}
                      alt={`${auto.brand} ${auto.name}`}
                    />
                  </div>
                  <div className={styles.carDetails}>
                    <h4>Esta reserva incluye</h4>
                    <ul className={styles.inclusionList}>
                      <li>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.checkIcon}
                        />
                        Protección del Vehículo
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.checkIcon}
                        />
                        Protección Contra Terceros
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.checkIcon}
                        />
                        Protección Contra Robos
                      </li>
                    </ul>
                    <div className={styles.infoAdicional}>
                      <FontAwesomeIcon
                        icon={faInfo}
                        className={styles.moreInfoIcon}
                      />
                      <button className={styles.infoAdicionalBtn} type="button">
                        Información Adicional
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.inputConteiner}>
                  <label className={styles.labelInput}>Desde</label>
                  <input
                    type="date"
                    name="fecha_inicio"
                    id="fecha_inicio"
                    className={styles.inputDate}
                    onChange={handleChange}
                    value={formData.fecha_inicio}
                    ref={fecha_inicioRef}
                    min={hoy}
                  />
                  <input
                    type="time"
                    name="hora_inicio"
                    id="hora_inicio"
                    className={styles.inputDate}
                    onChange={handleChange}
                    value={formData.hora_inicio}
                    ref={horario_inicioRef}
                  />
                  <div className={styles.errorContainer}>
                    <p
                      className={`${styles.errorMessage} ${
                        errores.hora_inicio ? styles.visible : ""
                      }`}
                    >
                      {errores.hora_inicio}
                    </p>
                  </div>
                  <div className={styles.errorContainer}>
                    <p
                      className={`${styles.errorMessage} ${
                        errores.fecha_inicio ? styles.visible : ""
                      }`}
                    >
                      {errores.fecha_inicio}
                    </p>
                  </div>

                  <label className={styles.labelInput}>Hasta</label>
                  <input
                    type="date"
                    name="fecha_fin"
                    id="fecha_fin"
                    className={styles.inputDate}
                    onChange={handleChange}
                    value={formData.fecha_fin}
                    ref={fecha_finRef}
                    min={formData.fecha_inicio || hoy}
                  />
                  <input
                    type="time"
                    name="hora_fin"
                    id="hora_fin"
                    className={styles.inputDate}
                    onChange={handleChange}
                    value={formData.hora_fin}
                    ref={horario_finRef}
                  />
                  <div className={styles.errorContainer}>
                    <p
                      className={`${styles.errorMessage} ${
                        errores.hora_fin ? styles.visible : ""
                      }`}
                    >
                      {errores.hora_fin}
                    </p>
                  </div>
                  <div className={styles.errorContainer}>
                    <p
                      className={`${styles.errorMessage} ${
                        errores.fecha_fin ? styles.visible : ""
                      }`}
                    >
                      {errores.fecha_fin}
                    </p>
                  </div>
                </div>

                <hr
                  style={{
                    border: "none",
                    height: "1px",
                    backgroundColor: "#E8E8E8",
                    margin: "1rem 0",
                    borderRadius: "5px",
                  }}
                />

                <div className={styles.precioTotal}>
                  <p className={styles.precio}>
                    Total: $
                    {precioFinal.toLocaleString("es-AR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Ars
                  </p>
                </div>
              </form>
            </div>

            <div className={styles.rightPanel}>
              {/* Retirada */}
              <div className={styles.placeInfo}>
                <h3 className={styles.rightTitle}>Retirada</h3>

                <div className={styles.placeHeader}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.locationDot}
                  />
                  <p className={styles.date}>
                    {formatearFechaHora(
                      formData.fecha_inicio,
                      formData.hora_inicio
                    )}
                  </p>
                </div>

                <p className={styles.place}>
                  {nombresLugares[formData.lugar_retiro] ||
                    'Aeropuerto de Rosario "Islas Malvinas"'}
                </p>
                <span className={styles.caption}>Aeropuerto</span>
                <div className={styles.retireInfo}>
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className={styles.infoIcon}
                  />
                  <span className={styles.infoText}>INFO IMPORTANTE</span>
                </div>
              </div>

              {/* Devolución */}
              <div className={styles.placeInfo}>
                <h3 className={styles.rightTitle}>Devolución</h3>

                <div className={styles.placeHeader}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.locationDot}
                  />
                  <p className={styles.date}>
                    {formatearFechaHora(formData.fecha_fin, formData.hora_fin)}
                  </p>
                </div>

                {/* Selector de lugar de devolución */}
                <div className={styles.dropdownContainer}>
                  <label
                    htmlFor="returnLocation"
                    className={styles.dropdownLabel}
                  >
                    Lugar de devolución
                  </label>
                  <div className={styles.customSelect}>
                    <select
                      id="returnLocation"
                      name="lugar_devolucion"
                      className={styles.locationDropdown}
                      onChange={handleChange}
                      value={formData.lugar_devolucion}
                    >
                      <option value="">
                        Selecciona un lugar de devolución
                      </option>
                      <option value="airport">
                        Aeropuerto de Rosario "Islas Malvinas"
                      </option>
                      <option value="downtown">
                        Centro de Rosario - Sucursal Principal
                      </option>
                      <option value="busStation">
                        Terminal de Ómnibus Mariano Moreno
                      </option>
                      <option value="other">Otra ubicación...</option>
                    </select>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={styles.dropdownArrow}
                    />
                  </div>

                  <div className={styles.errorContainer}>
                    <p
                      className={`${styles.errorMessage} ${
                        errores.lugar_devolucion ? styles.visible : ""
                      }`}
                    >
                      {errores.lugar_devolucion}
                    </p>
                  </div>
                </div>

                {/* Mostrar lugar seleccionado */}
                {formData.lugar_devolucion && (
                  <>
                    <p className={styles.place}>
                      {nombresLugares[formData.lugar_devolucion]}
                    </p>
                    <span className={styles.caption}>
                      {formData.lugar_devolucion === "airport"
                        ? "Aeropuerto"
                        : formData.lugar_devolucion === "downtown"
                        ? "Centro"
                        : formData.lugar_devolucion === "busStation"
                        ? "Terminal"
                        : "Otro"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.btnsConteiner}>
              <button
                className={styles.btnCancelar}
                type="button"
                onClick={() => {
                  localStorage.removeItem("datosAlquiler");
                  onClose();
                }}
              >
                Cancelar
              </button>
              <button
                className={styles.btnPagar}
                type="submit"
                onClick={handleSubmit}
                disabled={
                  Object.keys(errores).length > 0 || !formData.lugar_devolucion
                }
              >
                Ir a pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
