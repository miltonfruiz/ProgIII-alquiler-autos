import "../AdminTable/AdminTable.css";
import { IoSettingsSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Select from "react-select";

const ReservationsModalAdmin = ({
  users,
  cars,
  newReservation,
  setNewReservation,
  onClose,
  onSubmit,
  formErrors,
  editingReservation = false,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="modal-overlay-cars">
      <div className="modal-content-cars">
        <h2 className="create-text-cars">
          <IoSettingsSharp className="create-icon-cars" />
          {editingReservation ? "Editar Reserva" : "Crear Reserva"}
        </h2>
        <form onSubmit={onSubmit} className="car-form">
          <div className="cars-inputs">
            <div className="input-container">
              <select
                name="userId"
                value={newReservation.userId}
                onChange={handleChange}
                disabled={editingReservation}
              >
                <option value="">Seleccionar usuario</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre} {u.apellido}
                  </option>
                ))}
              </select>
              {formErrors.userId && (
                <p className="error-admin-input visible">{formErrors.userId}</p>
              )}
            </div>
            <div className="input-container">
              <select
                name="carId"
                value={newReservation.carId}
                onChange={handleChange}
                disabled={editingReservation}
              >
                <option value="">Seleccionar auto</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.brand} {c.name}
                  </option>
                ))}
              </select>
              {formErrors.carId && (
                <p className="error-admin-input visible">{formErrors.carId}</p>
              )}
            </div>
            <div className="input-container">
              <label>
                Fecha inicio:
                <input
                  type="date"
                  name="fecha_inicio"
                  value={newReservation.fecha_inicio}
                  onChange={handleChange}
                />
                {formErrors.fecha_inicio && (
                  <p className="error-admin-input visible">
                    {formErrors.fecha_inicio}
                  </p>
                )}
              </label>
            </div>
            <div className="input-container">
              <label>
                Fecha fin:
                <input
                  type="date"
                  name="fecha_fin"
                  value={newReservation.fecha_fin}
                  onChange={handleChange}
                />
                {formErrors.fecha_fin && (
                  <p className="error-admin-input visible">
                    {formErrors.fecha_fin}
                  </p>
                )}
              </label>
            </div>
            <div className="cars-container-button">
              <button className="create-button-cars" type="submit">
                <IoSend />
                {editingReservation ? "Guardar" : "Crear"}
              </button>
              <button
                className="cancel-button-cars"
                type="button"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationsModalAdmin;
