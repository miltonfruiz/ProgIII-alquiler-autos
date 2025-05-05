import React from "react";
import Header from "../Header/Header";
import { FaStar } from "react-icons/fa";

const CarPayment = () => {
  return (
    <div className="contenedor">
      <Header></Header>
      <div className="DatosFacturacion">
        <h2 className="titleDatos">Datos Facturacion</h2>
        <h3 className="subtituloDatos">introduce tus datos de facturacion</h3>
        <p className="paso1">Paso 1 de 3</p>
        <label htmlFor="" className="labelDatos">
          Nombre
        </label>
        <input type="text" className="inputDatos" />
        <label htmlFor="" className="labelDatos">
          Apellido
        </label>
        <input type="text" className="inputDatos" />
        <label htmlFor="" className="labelDatos">
          Numero de telefono
        </label>
        <input type="text" className="inputDatos" />
        <label htmlFor="" className="labelDatos">
          DNI
        </label>
        <input type="text" className="inputDatos" />
      </div>
      <div className="metodoPago">
        <h2 className="tituloMetodo">Metodo de Pago</h2>
        <h3 className="subtituloMetodo">Introduce tu metodo de pago</h3>
        <p className="paso2">Paso 2 de 3</p>
        <div className="ingresoTarjeta">
          <select name="" id="" className="selectMetodo">
            <option value="">Seleccione una opcion</option>
            <option value="opcion 1">Visa</option>
            <opcion value="opcion 2">Mastercard</opcion>
            <opcion value="opcion 3">American express</opcion>
            <opcion value="opcion 4">Tarjeta de debito</opcion>
          </select>
          <label htmlFor="" className="labelMetodo">
            Nombre de Tarjeta
          </label>
          <input type="text" className="inputMetodo" />
          <label htmlFor="" className="labelMetodo">
            Fecha de Expiracion
          </label>
          <input type="date" className="inputMetodo" />
          <label htmlFor="" className="labelMetodo">
            Nombre del titular
          </label>
          <input type="text" className="inputMetodo" />
          <label htmlFor="" className="labelMetodo">
            CVC
          </label>
          <input type="text" className="inputMetodo" />
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
        <input type="checkbox" className="aceptoTerminos" />{" "}
        <p className="textoAcepto">Acepto Terminos y condiciones</p>
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
          {
            //para que sea una linea hay q ponerle
            // un height de 1px
          }
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
