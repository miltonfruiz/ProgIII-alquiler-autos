import React from "react";
import Header from "../Header/Header";
import { FaStar } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { IoCard } from "react-icons/io5";
import { useState } from "react";

const CarPayment = () => {
  const [imgTarjetas, setImgTarjetas] = useState("visa");

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
  return (
    <div className="contenedor">
      <Header></Header>
      <div className="DatosFacturacion">
        <h2 className="titleDatos">Datos Facturacion</h2>
        <h3 className="subtituloDatos">introduce tus datos de facturacion</h3>
        <p className="paso1">Paso 1 de 3</p>
        <div className="gridDatosFacturacion">
          <div className="cajaInputDatos">
            <label htmlFor="" className="labelDatos">
              Nombre
            </label>
            <input type="text" className="inputDatos" placeholder="Nombre" />
          </div>
          <div className="cajaInputDatos">
            <label htmlFor="" className="labelDatos">
              Apellido
            </label>
            <input type="text" className="inputDatos" placeholder="Apellido" />
          </div>
          <div className="cajaInputDatos">
            <label htmlFor="" className="labelDatos">
              Numero de telefono
            </label>
            <input
              type="text"
              className="inputDatos"
              placeholder="5493333333333"
            />
          </div>
          <div className="cajaInputDatos">
            <label htmlFor="" className="labelDatos">
              DNI
            </label>
            <input type="text" className="inputDatos" placeholder="4000000" />
          </div>
        </div>
      </div>
      <div className="metodoPago">
        <h2 className="tituloMetodo">Metodo de Pago</h2>
        <h3 className="subtituloMetodo">Introduce tu metodo de pago</h3>
        <p className="paso2">Paso 2 de 3</p>
        <div className="ingresoTarjeta">
          <label htmlFor="seleccion">Seleccione una opcion</label>
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
          {imgTarjetas == "visa" && <RiVisaLine />}
          {imgTarjetas == "mastercard" && <FaCcMastercard />}
          {imgTarjetas == "american" && <SiAmericanexpress />}
          {imgTarjetas == "debito" && <IoCard />}

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
              <input type="text" className="inputMetodo" placeholder="CVC" />
            </div>
          </div>
        </div>
        <div className="cajaTransferenciaBancaria">
          <p className="transferenciaBancaria">Transferencia Bancaria</p>
        </div>
      </div>
      <div className="infoImportante">
        <h2 className="tituloInfo">Informacion Importante</h2>
        <h3 className="subtituloInfo">
          Lee atentamente esta informacion de utilidad
        </h3>
        <p className="paso3">Paso 3 de 3</p>
        <div className="seguroDelAuto">
          <h2 className="tituloSeguro">Seguro del auto</h2>
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
          <h2 className="tituloEntrega">Entrega y Devolucion</h2>
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
          <h2 className="TituloRequisitos">Requisitos al retirar</h2>
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
      <aside>
        <div className="resumenDeAlquiler">
          <h2 className="tituloResumen">Resumen de Alquiler</h2>
          <h3 className="subtituloResumen">
            Los precios pueden variar dependiendo de la duracion del alquiler y
            del precio de su coche de alquiler.
          </h3>
          <img
            className="imagenResumen"
            src="public\images\camionetaCarPayment.png"
            alt=""
          />
          <p className="nombreAutos">Volkswagen T-Cross</p>
          <div className="valoracionResumen">
            <FaStar className="estrella" />
            <FaStar className="estrella" />
            <FaStar className="estrella" />
            <FaStar className="estrella" />
            <FaStar className="estrella" />
            <p className="valoracion">valoracion</p>
          </div>
          <div className="linea"></div>

          <p className="tituloSubtotal">Subtotal</p>
          <p className="subtotal">$290.000</p>
          <p className="tituloImpuestos">Impuestos</p>
          <p className="impuestos">$34.000</p>
          <h2 className="tituloPrecioFinal">Precio final de renta</h2>
          <h3 className="subtituloPrecioFinal">
            Precio total con impuestos obligatorios
          </h3>
          <p className="precioFinal">$324.000</p>
        </div>
      </aside>
      <button className="botonRentar">Rentar ahora</button>
      <button className="botonCancelar">Cancelar</button>
    </div>
  );
};

export default CarPayment;
