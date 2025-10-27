import { FaStar } from "react-icons/fa";
import "./CarPayment.css";

const ResumenDeAlquiler = () => {
  const datosAlquiler = JSON.parse(localStorage.getItem("datosAlquiler"));

  return (
    <div className="contenedor-principal">
      <aside className="contenedor-aside">
        <div className="resumen-card">
          {/* Header Section */}
          <div className="header-seccion">
            <h3 className="titulo-principal">Resumen de Alquiler</h3>
            <p className="subtitulo-principal">
              Los precios pueden variar dependiendo de la duración del alquiler
              y del precio de su coche
            </p>
          </div>

          {/* Car Info Section */}
          <div className="contenido-padding">
            <div className="auto-info-box">
              <div className="auto-flex">
                <img
                  className="imagen-auto"
                  src={`http://localhost:3000${datosAlquiler.auto.image}`}
                  alt={datosAlquiler.auto.name}
                />
                <div className="auto-detalles">
                  <p className="nombre-auto">{datosAlquiler.auto.name}</p>
                  <p className="brand-auto">{datosAlquiler.auto.brand}</p>
                  {/* <div className="valoracion-container">
                    <div className="estrellas-flex">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <FaStar key={index} className="estrella-icon" />
                      ))}
                    </div>
                    <span className="texto-valoracion">valoraciones</span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="precios-container">
              <div className="precio-fila">
                <span className="precio-label">Subtotal</span>
                <span className="precio-valor">
                  ${datosAlquiler.total.toFixed(2)}
                </span>
              </div>

              <div className="precio-fila">
                <span className="precio-label">Impuestos</span>
                <span className="precio-valor">
                  ${datosAlquiler.tax.toFixed(2)}
                </span>
              </div>

              <div className="separador-gradiente"></div>

              {/* Total Section */}
              <div className="total-box">
                <div className="total-flex">
                  <div>
                    <h3 className="total-titulo">Precio Final</h3>
                    <p className="total-subtitulo">
                      Precio total con impuestos incluidos
                    </p>
                  </div>
                  <div className="total-precio-container">
                    <p className="total-precio">
                      ${datosAlquiler.totalFinal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ResumenDeAlquiler;
