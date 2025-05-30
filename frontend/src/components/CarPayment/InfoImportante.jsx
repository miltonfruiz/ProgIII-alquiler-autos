import React from "react";
import { objetosItems } from "./ObjetosCarPayment";

const InfoImportante = () => {
  return (
    <div>
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
    </div>
  );
};

export default InfoImportante;
