import React, { useRef } from "react";
import Header from "../Header/Header";
import { FaStar } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { IoCard } from "react-icons/io5";
import { useState } from "react";
import "./CarPayment.css";

const CarPayment = ({ onSubmit, errores, refs }) => {
  const [datosFacturacion, setDatosFacturacion] = useState({
    nombre: "",
    apellido: "",
    numeroTelefonico: "",
    dni: "",
  });

  const [imgTarjetas, setImgTarjetas] = useState("visa");

  const [seleccionTarjeta, setSeleccionTarjeta] = useState(false);
  const [seleccionCbu, setSeleccionCbu] = useState(false);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef(null);

  const eleccionTarjetaRef = useRef(null);
  const eleccionTransferRef = useRef(null);

  function handlerDatosFacturacion(e) {
    setDatosFacturacion({
      ...datosFacturacion,
      [e.target.name]: e.target.value,
    });
  }

  function handlerSubmit(e) {
    e.preventDefault();
    onSubmit(datosFacturacion);
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
    setFile(file);
  }

  function handlerSeleccion(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
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
    if (e.target.value == "visa") {
      setImgTarjetas("visa");
    } else if (e.target.value == "mastercard") {
      setImgTarjetas("mastercard");
    } else if (e.target.value == "american") {
      setImgTarjetas("american");
    } else {
      setImgTarjetas("debito");
    }
  }

  function handlerClickTarjeta() {
    eleccionTarjetaRef.current.click();
  }

  function handlerClickTransferencia() {
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
              <div className="cajaInputDatos">
                <label htmlFor="" className="labelDatos">
                  Nombre
                </label>
                <div>
                  <input
                    type="text"
                    className="inputDatos"
                    placeholder="Tu nombre"
                    name="nombre"
                    onChange={handlerDatosFacturacion}
                    value={datosFacturacion.nombre}
                    ref={refs.nombreRef}
                  />
                  {errores.nombre && <p className="error">{errores.nombre}</p>}
                </div>
              </div>
              <div className="cajaInputDatos">
                <label htmlFor="" className="labelDatos">
                  Apellido
                </label>
                <div>
                  <input
                    type="text"
                    className="inputDatos"
                    placeholder="Tu apellido"
                    name="apellido"
                    onChange={handlerDatosFacturacion}
                    value={datosFacturacion.apellido}
                    ref={refs.apellidoRef}
                  />
                  {errores.apellido && (
                    <p className="error">{errores.apellido}</p>
                  )}
                </div>
              </div>
              <div className="cajaInputDatos">
                <label htmlFor="" className="labelDatos">
                  Numero de telefono
                </label>
                <div>
                  <input
                    type="text"
                    className="inputDatos"
                    placeholder="5493333333333"
                    name="numeroTelefonico"
                    onChange={handlerDatosFacturacion}
                    value={datosFacturacion.numeroTelefonico}
                    ref={refs.numeroTelefonicoRef}
                  />
                  {errores.numeroTelefonico && (
                    <p className="error">{errores.numeroTelefonico}</p>
                  )}
                </div>
              </div>
              <div className="cajaInputDatos">
                <label htmlFor="" className="labelDatos">
                  DNI
                </label>
                <div>
                  <input
                    type="text"
                    className="inputDatos"
                    placeholder="4000000"
                    name="dni"
                    onChange={handlerDatosFacturacion}
                    value={datosFacturacion.dni}
                    ref={refs.dniRef}
                  />
                  {errores.dni && <p className="error">{errores.dni}</p>}
                </div>
              </div>
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
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="american">American express</option>
                    <option value="debito">Tarjeta de debito</option>
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
                    <div className="cajaInputTarjeta">
                      <label htmlFor="" className="labelMetodo">
                        Numero de Tarjeta
                      </label>
                      <input
                        type="text"
                        className="inputMetodo"
                        placeholder="Numero de tarjeta"
                      />
                    </div>
                    <div className="cajaInputTarjeta">
                      <label htmlFor="" className="labelMetodo">
                        Fecha de Expiracion
                      </label>
                      <input type="date" className="inputMetodo" />
                    </div>
                    <div className="cajaInputTarjeta">
                      <label htmlFor="" className="labelMetodo">
                        Nombre del titular
                      </label>
                      <input
                        type="text"
                        className="inputMetodo"
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div className="cajaInputTarjeta">
                      <label htmlFor="" className="labelMetodo">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="inputMetodo"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="cajaTransferenciaBancaria"
              onClick={handlerClickTransferencia}
            >
              <div className="containterEleccionTransfer">
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
                </div>
              )}
            </div>
          </div>
          <div className="infoImportante">
            <h2 className="tituloInfo">Informacion Importante</h2>
            <h3 className="subtituloInfo">
              Lee atentamente esta informacion de utilidad
            </h3>
            <p className="paso3">Paso 3 de 3</p>
            <div className="seguroDelAuto">
              <h2 className="tituloSeguro">🛡️ Seguro del auto</h2>
              <ul>
                <li className="liSeguroAuto">
                  Todos los autos incluyen un seguro contra terceros.
                </li>
                <li className="liSeguroAuto">
                  El seguro no cubre daños ocacionados por negligencia del
                  conductor.
                </li>
              </ul>
            </div>
            <div className="entregaYdevolucion">
              <h2 className="tituloEntrega">🕒 Entrega y Devolucion</h2>
              <ul>
                <li className="liEntrega">
                  El auto debe devolverse con el mismo nivel de combustible.
                </li>
                <li className="liEntrega">
                  Hay una hora de tolerancia para la devolucion.
                </li>
              </ul>
            </div>
            <div className="requisitosAlRetirar">
              <h2 className="TituloRequisitos">📍 Requisitos al retirar</h2>
              <ul>
                <li className="liRequisitos">
                  Presentar dni y licencia de conducir vigente.
                </li>
                <li className="liRequisitos">Ser mayor de 21 años.</li>
              </ul>
            </div>
            <div className="cajaAceptoTerminos">
              <input type="checkbox" className="aceptoTerminos" />
              <p className="textoAcepto">Acepto Terminos y condiciones</p>
            </div>
          </div>
          <button type="submit" className="botonRentar" onClick={handlerSubmit}>
            Rentar ahora
          </button>
          <button type="submit" className="botonCancelar">
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
                  <FaStar className="estrella" />
                  <FaStar className="estrella" />
                  <FaStar className="estrella" />
                  <FaStar className="estrella" />
                  <FaStar className="estrella" />
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
