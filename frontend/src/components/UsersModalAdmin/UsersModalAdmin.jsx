import { IoSend } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const UsersModalAdmin = ({
  user,
  editingUser,
  formErrors,
  handleChange,
  handleSubmit,
  handleClose,
  setUser,
}) => {
  const rolOptions = ["usuario", "empleado", "administrador"];
  return (
    <div className="modal-overlay-cars">
      <div className="modal-content-cars">
        <h2 className="create-text-cars">
          <IoSettingsSharp className="create-icon-cars" />
          {editingUser ? "Editar Usuario" : "Crear Usuario"}
        </h2>
        <form onSubmit={handleSubmit} className="car-form">
          <div className="cars-inputs">
            <div className="input-container">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={user.nombre}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.nombre ? "visible" : ""
                }`}
              >
                {formErrors.nombre || ""}
              </p>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={user.apellido}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.apellido ? "visible" : ""
                }`}
              >
                {formErrors.apellido || ""}
              </p>
            </div>
            <div className="input-container">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={user.correo}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.correo ? "visible" : ""
                }`}
              >
                {formErrors.correo || ""}
              </p>
            </div>
            <div className="input-container">
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={user.contraseña}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.contraseña ? "visible" : ""
                }`}
              >
                {formErrors.contraseña || ""}
              </p>
            </div>
            <div className="input-container">
              <input
                type="password"
                name="repetirContraseña"
                placeholder="Repetir contraseña"
                value={user.repetirContraseña}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.repetirContraseña ? "visible" : ""
                }`}
              >
                {formErrors.repetirContraseña || ""}
              </p>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={user.dni}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.dni ? "visible" : ""
                }`}
              >
                {formErrors.dni || ""}
              </p>
            </div>
            <div className="input-container">
              <input
                type="date"
                name="nacimiento"
                value={user.nacimiento}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.nacimiento ? "visible" : ""
                }`}
              >
                {formErrors.nacimiento || ""}
              </p>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="licencia"
                placeholder="Licencia"
                value={user.licencia}
                onChange={handleChange}
              />
              <p
                className={`error-admin-input ${
                  formErrors.licencia ? "visible" : ""
                }`}
              >
                {formErrors.licencia || ""}
              </p>
            </div>
            <div className="input-container">
              <select name="rol" value={user.rol} onChange={handleChange}>
                {rolOptions.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol.charAt(0).toUpperCase() + rol.slice(1)}
                  </option>
                ))}
              </select>
              <p
                className={`error-admin-input ${
                  formErrors.rol ? "visible" : ""
                }`}
              >
                {formErrors.rol || ""}
              </p>
            </div>
            <div className="cars-container-button">
              <button className="create-button-cars" type="submit">
                <IoSend /> {editingUser ? "Guardar cambios" : "Crear"}
              </button>
              <button
                className="cancel-button-cars"
                type="button"
                onClick={handleClose}
              >
                <MdCancel className="cancel-icon-cars" /> Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UsersModalAdmin;
