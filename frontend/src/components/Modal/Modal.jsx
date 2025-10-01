import React, { useState, useRef } from "react";
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
  // console.log("=== ESTRUCTURA DEL AUTO ===");
  // console.log("auto completo:", auto);
  // console.log("auto.id:", auto.id);
  // console.log("auto.id_car:", auto.id_car);
  // console.log("auto.carId:", auto.carId);
  // console.log("Todas las propiedades:", Object.keys(auto));
  const navigate = useNavigate();
  const hoy = new Date().toISOString().split("T")[0];
  const ahora = new Date();
  const horaActual = `${(ahora.getHours() + 1).toString().padStart(2, "0")}:00`; // Una hora después

  const [formData, setFormData] = useState({
    fecha_inicio: hoy,
    fecha_fin: hoy,
    hora_inicio: "10:00",
    hora_fin: "10:00",
    lugar_retiro: "airport",
    lugar_devolucion: "airport", // Valor por defecto para evitar undefined
  });

  const [errores, setErrores] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    hora_inicio: "",
    hora_fin: "",
    lugar_devolucion: "",
  });

  const fecha_inicioRef = useRef(null);
  const fecha_finRef = useRef(null);
  const horario_inicioRef = useRef(null);
  const horario_finRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newData = {
      ...formData,
      [name]: value,
    };

    // Si cambia la fecha de inicio y es posterior a la fecha fin, actualizar fecha fin
    if (name === "fecha_inicio" && value > formData.fecha_fin) {
      newData.fecha_fin = value;
    }

    // Si cambia la fecha de inicio a hoy, ajustar la hora si es necesaria
    if (name === "fecha_inicio" && value === hoy) {
      const ahora = new Date();
      const horaActual = `${(ahora.getHours() + 1)
        .toString()
        .padStart(2, "0")}:00`;

      // Si la hora actual es menor que la hora seleccionada, mantener la seleccionada
      if (
        formData.hora_inicio <=
        `${ahora.getHours().toString().padStart(2, "0")}:${ahora
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      ) {
        newData.hora_inicio = horaActual;
      }
    }

    // Limpiar errores
    setErrores({});

    const newErrores = ModalValidation(newData);

    if (Object.keys(newErrores).length > 0) {
      setErrores(newErrores);
    }

    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresModal = ModalValidation(formData); // Se pasan los datos que contiene el state formData a validacion
    // console.log("Errores encontrados:", erroresModal);

    const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;
    // console.log("User ID desde localStorage:", userId);

    if (Object.keys(erroresModal).length > 0) {
      setErrores(erroresModal);
      return;
    }

    try {
      const { success } = await crearReserva({
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
        carId: auto.id,
        lugar_devolucion: formData.lugar_devolucion,
        total: total,
        tax: tax,
        userId,
      });

      if (success) {
        // Branco: agrego esto para crear un id de reserva porque en el front no lo encontre en ningun lado
        // ---------------------------------------------------------

        let contador = localStorage.getItem("contadorReservas");

        contador = contador ? parseInt(contador) : 0;

        contador++;

        localStorage.setItem("contadorReservas", contador);
        // --------------------------------------------------------

        const total = calcularTotal();
        const impuestos = calcularImpuestos(total);
        const precioFinal = total + impuestos;
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
        }, 3000);
      } else {
        toast.error("No se pudo crear la reserva. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      toast.error("Error del servidor al crear la reserva.");
    }
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

    // Eliminar la hora para que no afecte el cálculo
    const fechaInicio = new Date(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate()
    );
    const fechaFin = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate());

    const diffDias =
      Math.floor((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24)) + 1;
    // .ceil para redondear la cantidad de dias, el fin-inicio devuelve en MILISEG, (1000 * 60 * 60 * 24) identifica la cantidad de MILISEG en un dia
    return diffDias > 0 ? diffDias * auto.price : 0;
  };
  const calcularImpuestos = (total) => {
    return total * 0.21;
  };
  console.log(errores);

  const total = calcularTotal();
  const impuestos = calcularImpuestos(total);

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
          <h4 className={styles.overlayTitle}>Reserva</h4>
          <div className={styles.modalBody}>
            <div className={styles.leftPanel}>
              <div className={styles.carReserva}>
                <span className={styles.reservaInfo}>
                  Auto a reservar
                  <p className={styles.carSelected}>
                    {auto.brand} {auto.name} | Ars $
                    {auto.price.toLocaleString()} / Dia
                  </p>
                </span>
                <div className={styles.carImage}>
                  {/* Aquí puedes agregar una imagen del auto si está disponible */}
                  <div className={styles.imagePlaceholder}>
                    <img src={auto.img} alt="Imagen del auto" />
                  </div>
                  <div className={styles.carDetails}>
                    <h4>Esta reserva incluye</h4>
                    <ul className={styles.inclusionList}>
                      <li>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.checkIcon}
                        />
                        Proteccion del Vehículo
                      </li>
                      <li>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.checkIcon}
                        />
                        Proteccion Contra Terceros
                      </li>
                      <li>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.checkIcon}
                        />
                        Proteccion Contra Robos
                      </li>
                    </ul>
                    <div className={styles.infoAdicional}>
                      <FontAwesomeIcon
                        icon={faInfo}
                        className={styles.moreInfoIcon}
                      />
                      <button className={styles.infoAdicionalBtn}>
                        Informacion Adicional
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
                    value={formData.fecha_inicio || ""}
                    ref={fecha_inicioRef}
                    min={hoy} // Esto previene seleccionar fechas pasadas en el navegador
                  />
                  <input
                    type="time"
                    name="hora_inicio"
                    id="hora_inicio"
                    className={styles.inputDate}
                    onChange={handleChange}
                    value={formData.hora_inicio || ""}
                    ref={horario_inicioRef}
                  />
                  {/* ERROR */}
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
                    value={formData.fecha_fin || ""}
                    ref={fecha_finRef}
                    min={formData.fecha_inicio || hoy} // La fecha fin no puede ser menor que la de inicio
                  />
                  <input
                    type="time"
                    name="hora_fin"
                    id="hora_fin"
                    className={styles.inputDate}
                    onChange={handleChange}
                    value={formData.hora_fin || ""}
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
                  <p
                    className={`${styles.errorMessage} ${
                      errores.fecha_fin ? styles.visible : ""
                    }`}
                  >
                    {errores.fecha_fin}
                  </p>
                </div>
                <hr
                  style={{
                    border: "none",
                    height: "1px",
                    backgroundColor: "#E8E8E8",
                    margin: "1rem 0",
                    borderradius: "5px",
                  }}
                />
                <div className={styles.precioTotal}>
                  <span className={styles.text}>Total</span>
                  <p className={styles.precio}>${total.toLocaleString()}</p>
                </div>
              </form>
            </div>
            <div className={styles.rightPanel}>
              {/* Aquí puedes agregar contenido adicional si es necesario */}
              <div className={styles.placeInfo}>
                <h3 className={styles.rightTitle}>Retirada</h3>

                <div className={styles.placeHeader}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.locationDot}
                  />
                  <p className={styles.date}>30/ago./2025 a las 10:00 AM</p>
                </div>

                <p className={styles.place}>
                  Aeropuerto de Rosario "Islas Malvinas", Argentina
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
              {/* Devolucion */}
              <div className={styles.placeInfo}>
                <h3 className={styles.rightTitle}>Devolucion</h3>

                <div className={styles.placeHeader}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.locationDot}
                  />
                  <p className={styles.date}>30/ago./2025 a las 10:00 AM</p>
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
                      onChange={handleChange} // Conectar al handleChange
                      value={formData.lugar_devolucion}
                    >
                      <option value="" disabled>
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
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div className={styles.btnsConteiner}>
              <button
                className={styles.btnCancelar}
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
                disabled={Object.keys(errores).length > 0}
              >
                Ir a pagar
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
// FALTA TERMINAR
export default Modal;
