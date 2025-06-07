import React, { useRef } from "react";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { IoCard } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import "./CarPayment.css";
import {
  objetosFormPersona,
  objetosFormTarjeta,
  objetosTarjetas,
  objetosItems,
} from "./ObjetosCarPayment.jsx";
import ResumenDeAlquiler from "./ResumenDeAlquiler.jsx";

const CarPayment = ({ onSubmit, errores, refs }) => {
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
        tipoTarjeta
      );
    } else if (choicePayment == "transferencia") {
      onSubmit(datosFacturacion, file, choicePayment, checkbox, tipoTarjeta);
    }
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
        <div className="DatosFacturacion">
          <h2 className="titleDatos">Datos de facturacion</h2>
          <h3 className="subtituloDatos">introduce tus datos de facturacion</h3>
          <p className="paso1">Paso 1 de 3</p>
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
          <h2 className="tituloMetodo">Metodo de Pago</h2>
          <h3 className="subtituloMetodo">Elije tu metodo de pago</h3>
          <p className="paso2">Paso 2 de 3</p>
          <div
            className={`ingresoTarjeta${
              choicePayment == "tarjeta" ? "Clickeado" : ""
            }`}
            onClick={(e) => {
              setChoicePayment(() => "tarjeta");
              eleccionTarjetaRef.current.click();
            }}
          >
            <div className="seleccionTarjeta">
              <input
                type="radio"
                name="opcion"
                value="1"
                className="eleccionTarjeta"
                onChange={handleTarjeta}
                ref={eleccionTarjetaRef}
              />
              <label htmlFor="" className="labelTarjeta">
                Pago con tarjeta
              </label>
            </div>

            {seleccionTarjeta && (
              <div
                className={`containerPago ${stateTransition ? "Visible" : ""}`}
              >
                <label htmlFor="seleccion" className="seleccion">
                  Seleccione una tarjeta
                </label>
                <select
                  name=""
                  id="seleccion"
                  className="selectMetodo"
                  onChange={handleImagenes}
                >
                  {objetosTarjetas.map((tarjeta) => {
                    return (
                      <option value={tarjeta.value}>{tarjeta.nombre}</option>
                    );
                  })}
                </select>

                {imgTarjetas == "visa" && (
                  <RiVisaLine className="logosTarjeta" />
                )}
                {imgTarjetas == "mastercard" && (
                  <FaCcMastercard className="logosTarjeta" />
                )}
                {imgTarjetas == "american" && (
                  <SiAmericanexpress className="logosTarjeta" />
                )}
                {imgTarjetas == "debito" && <IoCard className="logosTarjeta" />}
                <div className="gridDatosTarjeta">
                  {objetosFormTarjeta.map((input) => {
                    return (
                      <div className="cajaInputTarjeta">
                        <div>
                          <label htmlFor="" className="labelMetodo">
                            {input.label}
                          </label>
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
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div
            className={`cajaTransferenciaBancaria${
              choicePayment == "transferencia" ? "Clickeado" : ""
            }`}
            onClick={() => {
              setChoicePayment(() => "transferencia");
              eleccionTransferRef.current.click();
            }}
            tabIndex={-1}
            ref={refs.useRefs.errorEleccionRef}
          >
            <div
              className="containterEleccionTransfer"
              ref={refs.useRefs.comprobanteRef}
              tabIndex={-1}
            >
              <input
                type="radio"
                name="opcion"
                value="2"
                className="eleccionTranferencia"
                onChange={handleCbu}
                ref={eleccionTransferRef}
              />
              <p className="transferenciaBancaria">
                Pago con Transferencia Bancaria
              </p>
            </div>

            {seleccionCbu && (
              <div
                className={`conteinerTransferencia ${
                  stateTransition ? "Visible" : ""
                }`}
              >
                <h3 className="tituloTransferencia">
                  Transfiera a esta cuenta
                </h3>
                <div className="conteinerTransfer">
                  <div className="containerCbuTransfer">
                    <h3>CBU</h3>
                    <p>1430001717001234567890</p>
                  </div>

                  <div className="containerCbuTransfer">
                    <h3>Alias</h3>
                    <p>autos.alquiler.mpago</p>
                  </div>
                </div>
                <div
                  className={`containerArrastre ${
                    isDragging || file ? `Activo` : ``
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    setFile((prevFile) => file);
                  }}
                >
                  {file ? (
                    <p className="">Archivo cargado: {file.name}</p>
                  ) : (
                    <p className="">
                      Arrastre el comprobante aqui o seleccione un archivo
                    </p>
                  )}
                  <input
                    type="file"
                    className="comprobante"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setFile((prevFile) => e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                    ref={inputRef}
                  />
                  <button
                    className="botonArchivo"
                    onClick={(e) => inputRef.current.click()}
                  >
                    Seleccione un archivo
                  </button>

                  {isDragging || file ? (
                    <button
                      className="botonSacarArchivo"
                      onClick={() => {
                        setFile(null);
                        setIsDragging(false);
                      }}
                    >
                      <FaRegTrashCan />
                    </button>
                  ) : null}
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

        <div className="infoImportante">
          <h2 className="tituloInfo">Informacion Importante</h2>
          <h3 className="subtituloInfo">
            Lee atentamente esta informacion de utilidad
          </h3>
          <p className="paso3">Paso 3 de 3</p>
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
          </div>
          {errores.checkbox && <p className="error">{errores.checkbox}</p>}
        </div>

        <button type="button" className="botonRentar" onClick={handleSubmit}>
          Rentar ahora
        </button>
        <button type="button" className="botonCancelar">
          Cancelar
        </button>
      </div>
      {/*
        <ResumenDeAlquiler></ResumenDeAlquiler>
        */}
    </div>
  );
};

export default CarPayment;
