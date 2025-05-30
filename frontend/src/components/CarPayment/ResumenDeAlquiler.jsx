import React from "react";
import { FaStar } from "react-icons/fa";
const ResumenDeAlquiler = () => {
  return (
    <div>
      <aside>
        <div className="resumenDeAlquiler">
          <h2 className="tituloResumen">Resumen de Alquiler</h2>
          <h3 className="subtituloResumen">
            Los precios pueden variar dependiendo de la duracion del alquiler y
            del precio de su coche de alquiler.
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
  );
};

export default ResumenDeAlquiler;
