import React, { useRef } from "react";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { IoCard } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarPayment.css";
import {
  objetosFormPersona,
  objetosFormTarjeta,
  objetosTarjetas,
  objetosItems,
} from "./ObjetosCarPayment.jsx";
import ResumenDeAlquiler from "./ResumenDeAlquiler.jsx";
import {
  ObtenerReservas,
  CancelarReserva,
  ConfirmarReserva,
} from "../../api/actualizarReservas";
import { toast } from "react-toastify";

const CarPayment = ({ onSubmit, errores, refs }) => {
  const navigate = useNavigate();

  const [datosFacturacion, setDatosFacturacion] = useState({
    nombre: "",
    apellido: "",
    numeroTelefonico: "",
    dni: "",
  });

  const [datosTarjeta, setDatosTarjeta] = useState({
    numeroTarjeta: "",
    fechaTarjeta: "",
    nombreTarjeta: "",
    cvc: "",
  });

  const [imgTarjetas, setImgTarjetas] = useState("visa");
  const [seleccionTarjeta, setSeleccionTarjeta] = useState(false);
  const [seleccionCbu, setSeleccionCbu] = useState(false);
  const [stateTransition, setStateTransition] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [choicePayment, setChoicePayment] = useState(false);
  const [tipoTarjeta, setTipoTarjeta] = useState("Visa");
  const inputRef = useRef(null);
  const eleccionTarjetaRef = useRef(null);
  const eleccionTransferRef = useRef(null);

  function handleDatosFacturacion(e) {
    setDatosFacturacion({
      ...datosFacturacion,
      [e.target.name]: e.target.value,
    });
  }

  function handleDatosTarjeta(e) {
    setDatosTarjeta({
      ...datosTarjeta,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (choicePayment == "tarjeta" || !choicePayment) {
      onSubmit(
        datosFacturacion,
        datosTarjeta,
        choicePayment,
        checkbox,
        tipoTarjeta,
      );
    } else if (choicePayment == "transferencia") {
      onSubmit(datosFacturacion, file, choicePayment, checkbox, tipoTarjeta);
    }
    // navigate("/home");
  }

  function handleTarjeta(e) {
    if (e.target.value) {
      setSeleccionCbu(false);
      setSeleccionTarjeta(true);
      setTimeout(() => {
        setStateTransition("tarjeta");
      }, 100);
      setStateTransition("");
    }
  }

  function handleCbu(e) {
    if (e.target.value) {
      setSeleccionTarjeta(false);
      setSeleccionCbu(true);
      setTimeout(() => {
        setStateTransition("tranferencia");
      }, 100);
      setStateTransition("");
    }
  }

  function handleImagenes(e) {
    objetosTarjetas.map((tarjeta) => {
      if (e.target.value == tarjeta.value) {
        setImgTarjetas(tarjeta.value);
      }
    });
    setTipoTarjeta(e.target.value);
  }

  document.body.classList.add("desbloquear-scroll"); //AGREGO PARA DESBLOQUEAR EL SCROLL-Y PORQUE AL PASAR DEL AUTO A EL PAY SE TRABA

  //LOS DATOS DEL ALQUILER VIENEN DEL MODAL
  const datosAlquiler = JSON.parse(localStorage.getItem("datosAlquiler"));
  return (
    <div className="contenedorGeneral">
      <div className="contenedorIzquierda">
        <div className="datosFacturacion">
          <div className="header-seccion">
            <h3 className="titulo-principal">Datos de facturacion</h3>
            <p className="subtitulo-principal">
              introduce tus datos de facturacion
            </p>
            {/* <p className="paso1">Paso 1 de 3</p> */}
          </div>
          <div className="gridDatosFacturacion">
            {objetosFormPersona.map((input) => {
              return (
                <div className="cajaInputDatos">
                  <label htmlFor="" className="labelDatos">
                    {input.label}
                  </label>
                  <div>
                    <input
                      type="text"
                      className="inputDatos"
                      placeholder={input.placeholder}
                      name={input.name}
                      onChange={handleDatosFacturacion}
                      value={datosFacturacion[input.name]}
                      ref={refs.useRefs[`${input.name}Ref`]}
                    />
                    {errores[input.name] && (
                      <p className="error">{errores[input.name]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="metodoPago">
          <div className="header-seccion">
            <h3 className="titulo-principal">Metodo de Pago</h3>
            <p className="subtitulo-principal">Elije tu metodo de pago</p>
          </div>

          {/* Tarjeta */}
          <div
            className={`opcionPago ${choicePayment === "tarjeta" ? "opcionPagoActiva" : ""}`}
            onClick={() => {
              setChoicePayment("tarjeta");
              eleccionTarjetaRef.current.click();
            }}
          >
            <div className="opcionPagoHeader">
              <input
                type="radio"
                name="opcion"
                value="1"
                className="radioPago"
                onChange={handleTarjeta}
                ref={eleccionTarjetaRef}
              />
              <span className="iconoPago"></span>
              <span className="labelOpcionPago">Pago con tarjeta</span>
            </div>

            {seleccionTarjeta && (
              <div
                className={`containerPago ${stateTransition ? "Visible" : ""}`}
              >
                <div className="selectRow">
                  <label htmlFor="seleccion" className="seleccion">
                    Seleccione una tarjeta
                  </label>
                  <select
                    id="seleccion"
                    className="selectMetodo"
                    onChange={handleImagenes}
                  >
                    {objetosTarjetas.map((tarjeta) => (
                      <option key={tarjeta.value} value={tarjeta.value}>
                        {tarjeta.nombre}
                      </option>
                    ))}
                  </select>
                  <span className="logosTarjetaWrap">
                    {imgTarjetas === "visa" && (
                      <RiVisaLine className="logosTarjeta" />
                    )}
                    {imgTarjetas === "mastercard" && (
                      <FaCcMastercard className="logosTarjeta" />
                    )}
                    {imgTarjetas === "american" && (
                      <SiAmericanexpress className="logosTarjeta" />
                    )}
                    {imgTarjetas === "debito" && (
                      <IoCard className="logosTarjeta" />
                    )}
                  </span>
                </div>
                <div className="gridDatosTarjeta">
                  {objetosFormTarjeta.map((input) => (
                    <div key={input.name} className="cajaInputTarjeta">
                      <label className="labelMetodo">{input.label}</label>
                      <input
                        type={input.type}
                        className="inputMetodo"
                        placeholder={input.label}
                        name={input.name}
                        value={datosTarjeta[input.name]}
                        onChange={handleDatosTarjeta}
                        ref={refs.useRefs[`${input.name}Ref`]}
                      />
                      {errores[input.name] && (
                        <p className="error">{errores[input.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Transferencia */}
          <div
            className={`opcionPago ${choicePayment === "transferencia" ? "opcionPagoActiva" : ""}`}
            onClick={() => {
              setChoicePayment("transferencia");
              eleccionTransferRef.current.click();
            }}
            tabIndex={-1}
            ref={refs.useRefs.errorEleccionRef}
          >
            <div
              className="opcionPagoHeader"
              ref={refs.useRefs.comprobanteRef}
              tabIndex={-1}
            >
              <input
                type="radio"
                name="opcion"
                value="2"
                className="radioPago"
                onChange={handleCbu}
                ref={eleccionTransferRef}
              />
              <span className="iconoPago"></span>
              <span className="labelOpcionPago">
                Pago con Transferencia Bancaria
              </span>
            </div>

            {seleccionCbu && (
              <div
                className={`conteinerTransferencia ${stateTransition ? "Visible" : ""}`}
              >
                <p className="tituloTransferencia">Transferí a esta cuenta</p>
                <div className="conteinerTransfer">
                  <div className="containerCbuTransfer">
                    <span className="cbuLabel">CBU</span>
                    <span className="cbuValor">1430001717001234567890</span>
                  </div>
                  <div className="containerCbuTransfer">
                    <span className="cbuLabel">Alias</span>
                    <span className="cbuValor">autos.alquiler.mpago</span>
                  </div>
                </div>

                <div
                  className={`containerArrastre ${isDragging || file ? "Activo" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setFile(e.dataTransfer.files[0]);
                  }}
                >
                  {!file && (
                    <div className="uploadIcon">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="1.5"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                  )}
                  <p className="textoArrastre">
                    {file
                      ? `📎 ${file.name}`
                      : "Arrastrá el comprobante aquí o seleccioná un archivo"}
                  </p>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={inputRef}
                    onChange={(e) => {
                      if (e.target.files[0]) setFile(e.target.files[0]);
                    }}
                  />
                  <button
                    className="botonArchivo"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current.click();
                    }}
                  >
                    Seleccionar archivo
                  </button>
                  {(isDragging || file) && (
                    <button
                      className="botonSacarArchivo"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setIsDragging(false);
                      }}
                    >
                      <FaRegTrashCan />
                    </button>
                  )}
                </div>
                {errores.comprobante && (
                  <p className="error">{errores.comprobante}</p>
                )}
              </div>
            )}
          </div>

          {errores.errorEleccion && (
            <p className="error">{errores.errorEleccion}</p>
          )}
        </div>

        {/* Info importante */}
        <div className="infoImportante">
          <div className="header-seccion">
            <h3 className="titulo-principal">Informacion Importante</h3>
            <p className="subtitulo-principal">
              Lee atentamente esta informacion de utilidad
            </p>
            {/* <p className="paso3">Paso 3 de 3</p> */}
          </div>

          {objetosItems.map((items) => {
            return (
              <div className="cajaItems">
                <h2 className="tituloItems">{items.titulo}</h2>
                <ul>
                  <li className="liItems">{items.primerItem}</li>
                  <li className="liItems">{items.segundoItem}</li>
                </ul>
              </div>
            );
          })}
          <div className="cajaAceptoTerminos">
            <input
              type="checkbox"
              className="aceptoTerminos"
              onChange={(e) => setCheckBox(e.target.checked)}
            />
            <p className="textoAcepto">Acepto Terminos y condiciones</p>
            {errores.checkbox && <p className="error">{errores.checkbox}</p>}
          </div>
        </div>

        <button type="button" className="botonRentar" onClick={handleSubmit}>
          Rentar ahora
        </button>
        <button
          type="button"
          className="botonCancelar"
          onClick={async () => {
            const data = await ObtenerReservas();
            CancelarReserva(data);
            toast.info("Reserva cancelada correctamente");
            setTimeout(() => navigate("/home"), 1500);
          }}
        >
          Cancelar
        </button>
      </div>
      <ResumenDeAlquiler></ResumenDeAlquiler>
    </div>
  );
};

export default CarPayment;
