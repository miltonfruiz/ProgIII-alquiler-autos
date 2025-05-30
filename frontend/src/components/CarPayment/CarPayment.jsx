import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { IoCard } from "react-icons/io5";
import { useState } from "react";
import "./CarPayment.css";
import {
  objetosFormPersona,
  objetosFormTarjeta,
  objetosItems,
  objetosTarjetas,
} from "./ObjetosCarPayment.jsx";

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

  const [file, setFile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [choicePayment, setChoicePayment] = useState(false);
  const inputRef = useRef(null);

  const eleccionTarjetaRef = useRef(null);
  const eleccionTransferRef = useRef(null);

  function handlerDatosFacturacion(e) {
    setDatosFacturacion({
      ...datosFacturacion,
      [e.target.name]: e.target.value,
    });
  }

  function handlerDatosTarjeta(e) {
    setDatosTarjeta({
      ...datosTarjeta,
      [e.target.name]: e.target.value,
    });
  }

  function handlerSubmit(e) {
    e.preventDefault();

    if (choicePayment == "tarjeta" || !choicePayment) {
      onSubmit(datosFacturacion, datosTarjeta, choicePayment);
    } else if (choicePayment == "transferencia") {
      onSubmit(datosFacturacion, file, choicePayment);
    }
  }

  function handlerDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handlerDragLeave(e) {
    setIsDragging(false);
  }

  function handlerDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile((prevFile) => file);
  }

  function handlerSeleccion(e) {
    if (e.target.files[0]) {
      setFile((prevFile) => e.target.files[0]);
    }
  }

  function handlerTarjeta(e) {
    if (e.target.value) {
      setSeleccionCbu(false);
      setSeleccionTarjeta(true);
    }
  }

  function handlerCbu(e) {
    if (e.target.value) {
      setSeleccionTarjeta(false);
      setSeleccionCbu(true);
    }
  }

  function handleRefInput() {
    inputRef.current.click();
  }

  function handlerImagenes(e) {
    objetosTarjetas.map((tarjeta) => {
      if (e.target.value == tarjeta.value) {
        setImgTarjetas(tarjeta.value);
      }
    });
  }

  function handlerClickTarjeta() {
    setChoicePayment(() => "tarjeta");
    eleccionTarjetaRef.current.click();
  }

  function handlerClickTransferencia() {
    setChoicePayment(() => "transferencia");
    eleccionTransferRef.current.click();
  }
  document.body.classList.add("desbloquear-scroll"); //AGREGO PARA DESBLOQUEAR EL SCROLL-Y PORQUE AL PASAR DEL AUTO A EL PAY SE TRABA

  return (
    <div className="contenedorGeneral">
      <div className="contenedor">
        <div className="contenedorIzquierda">
          <div className="DatosFacturacion">
            <h2 className="titleDatos">Datos de facturacion</h2>
            <h3 className="subtituloDatos">
              introduce tus datos de facturacion
            </h3>
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
                        onChange={handlerDatosFacturacion}
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
            <div className="ingresoTarjeta" onClick={handlerClickTarjeta}>
              <div className="seleccionTarjeta">
                <input
                  type="radio"
                  name="opcion"
                  value="1"
                  className="eleccionTarjeta"
                  onChange={handlerTarjeta}
                  ref={eleccionTarjetaRef}
                />
                <label htmlFor="" className="labelTarjeta">
                  Pago con tarjeta
                </label>
              </div>

              {seleccionTarjeta && (
                <div>
                  <label htmlFor="seleccion" className="seleccion">
                    Seleccione una tarjeta
                  </label>
                  <select
                    name=""
                    id="seleccion"
                    className="selectMetodo"
                    onChange={handlerImagenes}
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
                  {imgTarjetas == "debito" && (
                    <IoCard className="logosTarjeta" />
                  )}
                  <div className="gridDatosTarjeta">
                    {objetosFormTarjeta.map((input) => {
                      return (
                        <div className="cajaInputTarjeta">
                          <div>
                            <label htmlFor="" className="labelMetodo">
                              {input.label}
                            </label>
                            <input
                              type="text"
                              className="inputMetodo"
                              placeholder={input.label}
                              name={input.name}
                              value={datosTarjeta[input.name]}
                              onChange={handlerDatosTarjeta}
                              ref={refs.useRefs[`${input.name}Ref`]}
                            />
                          </div>
                          {errores[input.name] && (
                            <p className="error">{errores[input.name]}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div
              className="cajaTransferenciaBancaria"
              onClick={handlerClickTransferencia}
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
                  onChange={handlerCbu}
                  ref={eleccionTransferRef}
                />
                <p className="transferenciaBancaria">
                  Pago con Transferencia Bancaria
                </p>
              </div>

              {seleccionCbu && (
                <div className="conteinerTransferencia">
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
                    onDragOver={handlerDragOver}
                    onDragLeave={handlerDragLeave}
                    onDrop={handlerDrop}
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
                      onChange={handlerSeleccion}
                      style={{ display: "none" }}
                      ref={inputRef}
                    />
                    <button className="" onClick={handleRefInput}>
                      Seleccione un archivo
                    </button>
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
              <input type="checkbox" className="aceptoTerminos" />
              <p className="textoAcepto">Acepto Terminos y condiciones</p>
            </div>
          </div>
          <button type="button" className="botonRentar" onClick={handlerSubmit}>
            Rentar ahora
          </button>
          <button type="button" className="botonCancelar">
            Cancelar
          </button>
        </div>

        <aside>
          <div className="resumenDeAlquiler">
            <h2 className="tituloResumen">Resumen de Alquiler</h2>
            <h3 className="subtituloResumen">
              Los precios pueden variar dependiendo de la duracion del alquiler
              y del precio de su coche de alquiler.
            </h3>
            <div className="cajaValoracionAuto">
              <img
                className="imagenResumen"
                src="public\images\camionetaCarPayment.png"
                alt=""
              />
              <div className="cajaExtrellasNombre">
                <p className="nombreAutos">Volkswagen T-Cross</p>
                <div className="valoracionResumen">
                  {[0, 1, 2, 3, 4].map((estrella) => {
                    return <FaStar className="estrella" />;
                  })}

                  <p className="valoracion">valoracion</p>
                </div>
              </div>
            </div>

            <div className="linea"></div>
            <div className="cajaSubtotal">
              <p className="tituloSubtotal">Subtotal</p>
              <p className="subtotal">$290.000</p>
            </div>
            <div className="cajaImpuestos">
              <p className="tituloImpuestos">Impuestos</p>
              <p className="impuestos">$34.000</p>
            </div>
            <div className="cajaPrecioFinal">
              <div>
                <h2 className="tituloPrecioFinal">Precio final de renta</h2>
                <h3 className="subtituloPrecioFinal">
                  Precio total con impuestos obligatorios
                </h3>
              </div>

              <p className="precioFinal">$324.000</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CarPayment;
