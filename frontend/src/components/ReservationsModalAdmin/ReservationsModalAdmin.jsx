import "./ReservationsModalAdmin.css";

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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editingReservation ? "Editar Reserva" : "Crear Reserva"}</h2>
        <form onSubmit={onSubmit} className="modal-form">
          <label>
            Usuario:
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
            {formErrors.userId && <p className="error">{formErrors.userId}</p>}
          </label>

          <label>
            Auto:
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
            {formErrors.carId && <p className="error">{formErrors.carId}</p>}
          </label>

          <label>
            Fecha inicio:
            <input
              type="date"
              name="fecha_inicio"
              value={newReservation.fecha_inicio}
              onChange={handleChange}
            />
            {formErrors.fecha_inicio && (
              <p className="error">{formErrors.fecha_inicio}</p>
            )}
          </label>

          <label>
            Fecha fin:
            <input
              type="date"
              name="fecha_fin"
              value={newReservation.fecha_fin}
              onChange={handleChange}
            />
            {formErrors.fecha_fin && (
              <p className="error">{formErrors.fecha_fin}</p>
            )}
          </label>

          <div className="modal-buttons">
            <button type="submit">
              {editingReservation ? "Guardar cambios" : "Crear"}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationsModalAdmin;
