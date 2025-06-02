import { IoSettingsSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Select from "react-select";

const CarsAdminModal = ({
  newCar,
  formErrors,
  handleChange,
  handleSubmit,
  handleCloseModal,
  setNewCar,
  editingCar,
  categoryOptions,
  transmissionOptions,
  brandOptions,
  stateOptions,
}) => {
  return (
    <div className="modal-overlay-cars">
      <div className="modal-content-cars">
        <h2 className="create-text-cars">
          <IoSettingsSharp className="create-icon-cars" />
          {editingCar ? "Editar auto" : "Crear auto"}
        </h2>
        <form onSubmit={handleSubmit} className="car-form">
          <div className="image-inputs-container">
            <div
              className="cars-image-wrapper"
              onClick={() => document.getElementById("car-image-input").click()}
            >
              <div className="input-container-image">
                {newCar.image ? (
                  <img
                    src={URL.createObjectURL(newCar.image)}
                    alt="Vista previa"
                    className="cars-preview-image"
                  />
                ) : (
                  <p className="cars-placeholder-text">
                    Haz clic para subir una imagen
                  </p>
                )}
                <AiFillEdit className="camera-icon" />
                <input
                  id="car-image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNewCar({ ...newCar, image: file });
                    }
                  }}
                  style={{ display: "none" }}
                />
                <p
                  className={`error-admin-input-image ${
                    formErrors.image ? "visible" : ""
                  }`}
                >
                  {formErrors.image || ""}
                </p>
              </div>
            </div>
            <div className="cars-inputs">
              <div className="input-container">
                <input
                  className="input-name"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={newCar.name}
                  onChange={handleChange}
                />
                <p
                  className={`error-admin-input ${
                    formErrors.name ? "visible" : ""
                  }`}
                >
                  {formErrors.name || ""}
                </p>
              </div>
              <div className="input-container">
                <Select
                  className="select-options"
                  options={categoryOptions}
                  placeholder="Categoría"
                  value={
                    categoryOptions.find(
                      (opt) => opt.value === newCar.category
                    ) || null
                  }
                  onChange={(opt) =>
                    setNewCar({ ...newCar, category: opt.value })
                  }
                  menuPosition="fixed"
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                />
                <p
                  className={`error-admin-input ${
                    formErrors.category ? "visible" : ""
                  }`}
                >
                  {formErrors.category || ""}
                </p>
              </div>
              <div className="input-container">
                <input
                  className="input-name"
                  type="number"
                  name="passengers"
                  placeholder="Pasajeros"
                  value={newCar.passengers}
                  onChange={handleChange}
                />
                <p
                  className={`error-admin-input ${
                    formErrors.passengers ? "visible" : ""
                  }`}
                >
                  {formErrors.passengers || ""}
                </p>
              </div>
              <div className="input-container">
                <Select
                  className="select-options"
                  options={transmissionOptions}
                  placeholder="Transmisión"
                  value={
                    transmissionOptions.find(
                      (opt) => opt.value === newCar.transmission
                    ) || null
                  }
                  onChange={(opt) =>
                    setNewCar({ ...newCar, transmission: opt.value })
                  }
                  menuPosition="fixed"
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                />
                <p
                  className={`error-admin-input ${
                    formErrors.transmission ? "visible" : ""
                  }`}
                >
                  {formErrors.transmission || ""}
                </p>
              </div>
              <div className="input-container">
                <input
                  className="input-name"
                  type="number"
                  name="price"
                  placeholder="Precio"
                  value={newCar.price}
                  onChange={handleChange}
                />
                <p
                  className={`error-admin-input ${
                    formErrors.price ? "visible" : ""
                  }`}
                >
                  {formErrors.price || ""}
                </p>
              </div>
              <div className="input-container">
                <Select
                  className="select-options"
                  options={brandOptions}
                  placeholder="Marca"
                  value={
                    brandOptions.find((opt) => opt.value === newCar.brand) ||
                    null
                  }
                  onChange={(opt) => setNewCar({ ...newCar, brand: opt.value })}
                  menuPosition="fixed"
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                />
                <p
                  className={`error-admin-input ${
                    formErrors.brand ? "visible" : ""
                  }`}
                >
                  {formErrors.brand || ""}
                </p>
              </div>
              <div className="input-container">
                <Select
                  className="select-options"
                  options={stateOptions}
                  placeholder="Estado"
                  value={
                    stateOptions.find((opt) => opt.value === newCar.estado) ||
                    null
                  }
                  onChange={(opt) =>
                    setNewCar({ ...newCar, estado: opt.value })
                  }
                  menuPosition="fixed"
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                />
                <p
                  className={`error-admin-input ${
                    formErrors.estado ? "visible" : ""
                  }`}
                >
                  {formErrors.estado || ""}
                </p>
              </div>
              <div className="cars-container-button">
                <button className="create-button-cars" type="submit">
                  <IoSend /> {editingCar ? "Editar" : "Crear"}
                </button>
                <button
                  className="cancel-button-cars"
                  type="button"
                  onClick={handleCloseModal}
                >
                  <MdCancel className="cancel-icon-cars" /> Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "8px",
    outline: "none",
    borderColor: state.isFocused ? "#6366f1" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 2px rgba(99, 102, 241, 0.2)" : "none",
    "&:hover": {
      borderColor: "#6366f1",
    },
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (provided) => ({
    ...provided,
    overflowY: "auto",
    fontSize: "11px",
  }),
};
export default CarsAdminModal;
