import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./UsersTableAdmin.css";

const UsersTableAdmin = ({ users, onEdit, onDelete, search }) => {
  return (
    <div className="table-container">
      <table className="table-users-admin">
        <thead className="admin-thead">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>DNI</th>
            <th>Nacimiento</th>
            <th>Licencia</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className={`administration-row ${search ? "fade-in" : ""}`}
              >
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.correo}</td>
                <td>{user.dni}</td>
                <td>{user.nacimiento}</td>
                <td>{user.licencia}</td>
                <td>{user.rol}</td>
                <td className="button-actions">
                  <button
                    className="administration-button-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(user);
                    }}
                  >
                    <FaEdit className="adm-icon-edit" /> Editar
                  </button>
                  <button
                    className="administration-button-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(user);
                    }}
                  >
                    <RiDeleteBin6Line className="adm-icon-delete" /> Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-results-text">
                No se encontraron usuarios...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UsersTableAdmin;
