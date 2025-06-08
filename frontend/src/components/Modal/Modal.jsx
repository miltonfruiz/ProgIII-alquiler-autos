import React, { useState, useRef } from "react";
import styles from "./Modal.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalValidation from "../ModalValidation/ModalValidation";
import { crearReserva } from "../../api/reservas";

function Modal({ auto, onClose }) {
  if (!auto) return null;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fecha_inicio: undefined,
    fecha_fin: undefined,
  });

  const [errores, setErrores] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });

  const fecha_inicioRef = useRef(null);
  const fecha_finRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newData = {
      ...formData,
      [name]: value,
    };

    console.log("newData:", newData);

    // limpiar errores
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
    console.log("Errores encontrados:", erroresModal);

    const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;
    console.log("User ID desde localStorage:", userId);

    if (Object.keys(erroresModal).length > 0) {
      setErrores(erroresModal);
    }

    try {
      const { success } = await crearReserva({
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        carId: auto.id,
        userId,
      });

      if (success) {
        const total = calcularTotal();
        const impuestos = calcularImpuestos(total);
        const precioFinal = total + impuestos;
        // Guardar datos en localStorage
        const datosAlquiler = {
          auto: auto,
          fecha_inicio: formData.fecha_inicio,
          fecha_fin: formData.fecha_fin,
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
          <div className={styles.carReserva}>
            <span className={styles.reservaInfo}>
              Auto a reservar:
              <p className={styles.carSelected}>
                {auto.name} | Ars ${auto.price.toLocaleString()} / Dia
              </p>
            </span>
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
              />

              {/* ERROR */}
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
              />
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
              <p className={styles.precio}>
                ${calcularTotal().toLocaleString()}
              </p>
            </div>

            <div className={styles.btnsConteiner}>
              <button
                className={styles.btnCancelar}
                onClick={() => {
                  localStorage.removeItem("datosAlquiler");
                  onClose(); // cerrás el modal
                }}
              >
                Cancelar
              </button>
              <button
                className={styles.btnPagar}
                type="submit"
                disabled={Object.keys(errores).length > 0}
              >
                Ir a pagar
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
// FALTA TERMINAR
export default Modal;
