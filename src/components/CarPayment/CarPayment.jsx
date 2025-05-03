import React from "react";
import Header from "../Header/Header";
import { FaStar } from "react-icons/fa";

const CarPayment = () => {
  return (
    <div>
      <Header></Header>
      <div className="DatosFacturacion">
        <h2>Datos Facturacion</h2>
        <h3>introduce tus datos de facturacion</h3>
        <p>Paso 1 de 3</p>
        <label htmlFor="">Nombre</label>
        <input type="text" />
        <label htmlFor="">Apellido</label>
        <input type="text" />
        <label htmlFor="">Numero de telefono</label>
        <input type="text" />
        <label htmlFor="">DNI</label>
        <input type="text" />
      </div>
      <div className="metodoPago">
        <h2>Metodo de Pago</h2>
        <h3>Introduce tu metodo de pago</h3>
        <p>Paso 2 de 3</p>
        <div className="ingresoTarjeta">
          <select name="" id="">
            <option value="">Seleccione una opcion</option>
            <option value="opcion 1">Visa</option>
            <opcion value="opcion 2">Mastercard</opcion>
            <opcion value="opcion 3">American express</opcion>
            <opcion value="opcion 4">Tarjeta de debito</opcion>
          </select>
          <label htmlFor="">Nombre de Tarjeta</label>
          <input type="text" />
          <label htmlFor="">Fecha de Expiracion</label>
          <input type="date" />
          <label htmlFor="">Nombre del titular</label>
          <input type="text" />
          <label htmlFor="">CVC</label>
          <input type="text" />
        </div>
        <div>
          <p>Transferencia Bancaria</p>
        </div>
      </div>
      <div className="infoImportante">
        <h2>Informacion Importante</h2>
        <h3>Lee atentamente esta informacion de utilidad</h3>
        <p>Paso 3 de 3</p>
        <div className="seguroDelAuto">
          <h2>Seguro del auto</h2>
          <ul>
            <li>Todos los autos incluyen un seguro contra terceros.</li>
            <li>
              El seguro no cubre daños ocacionados por negligencia del
              conductor.
            </li>
          </ul>
        </div>

        <div className="entregaYdevolucion">
          <h2>Entrega y Devolucion</h2>
          <ul>
            <li>El auto debe devolverse con el mismo nivel de combustible.</li>
            <li>Hay una hora de tolerancia para la devolucion.</li>
          </ul>
        </div>

        <div className="requisitosAlRetirar">
          <h2>Requisitos al retirar</h2>
          <ul>
            <li>Presentar dni y licencia de conducir vigente.</li>
            <li>Ser mayor de 21 años.</li>
          </ul>
        </div>
        <input type="checkbox" />
      </div>
      <aside>
        <div className="resumenDeAlquiler">
          <h2>Resumen de Alquiler</h2>
          <h3>
            Los precios pueden variar dependiendo de la duracion del alquiler y
            del precio de su coche de alquiler.
          </h3>
          <img src="public\images\camionetaCarPayment.png" alt="" />
          <div>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <p>valoracion</p>
          </div>
          <div className="linea"></div>
          {
            //para que sea una linea hay q ponerle
            // un height de 1px
          }
          <p>Subtotal</p>
          <p>$290.000</p>
          <p>Impuestos</p>
          <p>$34.000</p>
          <h2>Precio final de renta</h2>
          <h3>Precio total con impuestos obligatorios</h3>
          <p>$324.000</p>
        </div>
      </aside>
      <button>Rentar ahora</button> <button>Cancelar</button>
    </div>
  );
};

export default CarPayment;
