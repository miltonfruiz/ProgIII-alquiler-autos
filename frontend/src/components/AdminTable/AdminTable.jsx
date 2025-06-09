import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./AdminTable.css";

const AdminTable = ({ data, columns, fields, onEdit, onDelete, search }) => {
  return (
    <div className="table-container">
      <table className="table-admin">
        <thead className="admin-thead">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id_reserva || item.id}
                className={`administration-row ${search ? "fade-in" : ""}`}
              >
                {fields.map((field, idx) => (
                  <td key={`${item.id_reserva || item.id}-${idx}`}>
                    {typeof field === "function" ? field(item) : item[field]}
                  </td>
                ))}

                <td className="button-actions">
                  <button
                    className="administration-button-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(item);
                    }}
                  >
                    <FaEdit className="adm-icon-edit" /> Editar
                  </button>
                  <button
                    className="administration-button-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item);
                    }}
                  >
                    <RiDeleteBin6Line className="adm-icon-delete" /> Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 1} className="no-results-text">
                No se encontraron resultados...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
