import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./CarsAdminTable.css";

const CarsAdminTable = ({ cars, onEdit, onDelete, search }) => {
  return (
    <div className="table-container">
      <table className="table-cars-admin">
        <thead className="admin-thead">
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Transmisión</th>
            <th>Pasajeros</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr
                colSpan="8"
                key={car.id}
                className={`administration-row ${search ? "fade-in" : ""}`}
              >
                <td>{car.name}</td>
                <td>{car.category}</td>
                <td>${car.price}</td>
                <td>{car.transmission}</td>
                <td>{car.passengers}</td>
                <td>{car.brand}</td>
                <td>{car.state}</td>
                <td className="button-actions">
                  <button
                    className="administration-button-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(car);
                    }}
                  >
                    <FaEdit className="adm-icon-edit" /> Editar
                  </button>
                  <button
                    className="administration-button-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(car.id);
                    }}
                  >
                    <RiDeleteBin6Line className="adm-icon-delete" /> Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="administration-row">
              <td colSpan="8" className="no-results-text">
                No se encontraron autos...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarsAdminTable;
