import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./CarPayment.css";
import { ObtenerReservas } from "../../api/actualizarReservas";

const ResumenDeAlquiler = () => {
  const [reservas, setReservas] = useState([]);
  const datosAlquiler = JSON.parse(localStorage.getItem("datosAlquiler"));

  useEffect(() => {
    const cargarReservas = async () => {
      const data = await ObtenerReservas();
      console.log("Datos de reservas cargados:", data);
      setReservas(data);
    };

    cargarReservas();
  }, []);

  const ultimaReserva =
    reservas.length > 0 ? reservas[reservas.length - 1] : null;

  // MOVER LA VALIDACIÓN ANTES DE LOS CONSOLE.LOG
  if (!ultimaReserva) {
    return <div className="contenedor-principal">Cargando reservas...</div>;
  }

  console.log("Reservas obtenidas:", reservas);
  console.log("total final:", ultimaReserva.total);
  console.log("subtotal:", ultimaReserva.subtotal);
  console.log("tax:", ultimaReserva.tax);

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
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="precios-container">
              <div className="precio-fila">
                <span className="precio-label">Subtotal</span>
                <span className="precio-valor">
                  ${ultimaReserva.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="precio-fila">
                <span className="precio-label">Impuestos</span>
                <span className="precio-valor">
                  ${ultimaReserva.tax.toFixed(2)}
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
                      $
                      {ultimaReserva.total.toLocaleString("es-AR", {
                        maximumFractionDigits: 2,
                      })}
                      Ars
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
