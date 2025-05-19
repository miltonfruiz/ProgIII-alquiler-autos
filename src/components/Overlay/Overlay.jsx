import React from "react";
import styles from "./Overlay.module.css";

function Overlay({ auto, onClose }) {
  //   if (!auto) return null;

  return (
    <div className={styles.overlayConteiner}>
      <div className={styles.overlayContent}>
        <h4 className={styles.overlayTitle}>Reserva</h4>
        <div className={styles.carReserva}>
          <span className={styles.reservaInfo}>
            Auto a reservar:
            <p className={styles.carSelected}>
              Toyota Etios | Ars $36.300 / Dia
            </p>
          </span>
        </div>
        {/* AQUI VAN LOS INPUTS */}

        <div className={styles.inputConteiner}>
          <label className={styles.labelInput}>Desde</label>
          <input
            type="date"
            name="desde"
            className={styles.inputDate}
            // onChange={handleChange}
          />

          <label className={styles.labelInput}>Hasta</label>
          <input
            type="date"
            name="hasta"
            className={styles.inputDate}
            // onChange={handleChange}
          />
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
          <p className={styles.precio}>$63.200</p>
        </div>

        <div className={styles.btnsConteiner}>
          <button className={styles.btnCancelar}>Cancelar</button>
          <button className={styles.btnPagar} type="submit">
            Ir a pagar
          </button>
        </div>
      </div>
    </div>
  );
}
// FALTA TERMINAR
export default Overlay;
