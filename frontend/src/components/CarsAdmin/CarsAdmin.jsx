import { useEffect, useState } from "react";
import "./CarsAdmin.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaClipboardList, FaPlus, FaDownload } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { IoSend, IoSettingsSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import Select from "react-select";
import CardAdminValidation from "../CarAdminValidation/CarAdminValidation";
import { ToastContainer, toast } from "react-toastify";

const CarsAdmin = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editingCar, setEditingCar] = useState(null);

  const [newCar, setNewCar] = useState({
    name: "",
    category: "",
    image: null,
    passengers: "",
    transmission: "",
    price: "",
    brand: "",
    estado: "",
  });
  const categoryOptions = [
    { value: "Económico", label: "Económico" },
    { value: "Compacto", label: "Compacto" },
    { value: "Estándar", label: "Estándar" },
    { value: "Full-size", label: "Full-size" },
    { value: "Premium", label: "Premium" },
    { value: "SUV", label: "SUV" },
    { value: "Pickup", label: "Pickup" },
    { value: "Minivan", label: "Minivan" },
    { value: "Deportivo", label: "Deportivo" },
    { value: "Eléctrico", label: "Eléctrico" },
  ];
  const stateOptions = [
    { value: "Disponible", label: "Disponible" },
    { value: "No Disponible", label: "No Disponible" },
  ];
  const transmissionOptions = [
    { value: "Manual", label: "Manual" },
    { value: "Automática", label: "Automática" },
  ];
  const brandOptions = [
    { value: "Kia", label: "Kia" },
    { value: "Chevrolet", label: "Chevrolet" },
    { value: "Nissan", label: "Nissan" },
    { value: "Hyundai", label: "Hyundai" },
    { value: "Toyota", label: "Toyota" },
    { value: "Volskwagen", label: "Volskwagen" },
    { value: "Honda", label: "Honda" },
    { value: "Mazda", label: "Mazda" },
    { value: "BMW", label: "BMW" },
    { value: "Mercedes-Benz", label: "Mercedes-Benz" },
    { value: "Ford", label: "Ford" },
    { value: "Jeep", label: "Jeep" },
    { value: "Chrysler", label: "Chrysler" },
    { value: "Dodge", label: "Dodge" },
    { value: "Audi", label: "Audi" },
    { value: "Tesla", label: "Tesla" },
    { value: "BYD", label: "BYD" },
  ];
  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setCars([...data]))
      .catch((err) => console.error("Error al traer autos:", err));
  }, []);
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",
      });
      toast.success("Auto borrado correctamente!");
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error al eliminar auto:", error);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const errors = CardAdminValidation(newCar);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const formData = new FormData();
      formData.append("name", newCar.name);
      formData.append("category", newCar.category);
      formData.append("image", newCar.image);
      formData.append("passengers", newCar.passengers);
      formData.append("transmission", newCar.transmission);
      formData.append("price", newCar.price);
      formData.append("brand", newCar.brand);
      formData.append("estado", newCar.estado);
      const res = await fetch("http://localhost:3000/cars", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Respuesta del servidor:", text);
        alert("Error inesperado al crear el auto.");
        return;
      }
      toast.success("Auto creado correctamente!");
      const data = await res.json();
      setCars([...cars, data]);
      setShowModal(false);
      setNewCar({
        name: "",
        category: "",
        image: null,
        passengers: "",
        transmission: "",
        price: "",
        brand: "",
        estado: "Disponible",
      });
    } catch (error) {
      console.error("Error al crear auto:", error);
    }
  };
  const filteredCars = cars.filter((car) =>
    car.name?.toLowerCase().includes(search.toLowerCase())
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = CardAdminValidation(newCar);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const formData = new FormData();
      formData.append("name", newCar.name);
      formData.append("category", newCar.category);
      if (newCar.image) formData.append("image", newCar.image);
      formData.append("passengers", newCar.passengers);
      formData.append("transmission", newCar.transmission);
      formData.append("price", newCar.price);
      formData.append("brand", newCar.brand);
      formData.append("estado", newCar.estado);
      const res = await fetch(`http://localhost:3000/cars/${editingCar.id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Respuesta del servidor:", text);
        alert("Error al actualizar el auto.");
        return;
      }
      toast.success("Auto editado correctamente!");
      const updatedCar = await res.json();
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
      );
      setShowModal(false);
      setEditingCar(null);
      setNewCar({
        name: "",
        category: "",
        image: null,
        passengers: "",
        transmission: "",
        price: "",
        brand: "",
        estado: "",
      });
    } catch (error) {
      console.error("Error al actualizar auto:", error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCar(null);
    setNewCar({
      name: "",
      category: "",
      image: null,
      passengers: "",
      transmission: "",
      price: "",
      brand: "",
      estado: "",
    });
    setFormErrors({});
  };
  function convertToCSV(data) {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((value) =>
          typeof value === "string"
            ? `"${value.replace(/"/g, '""')}"`
            : `"${value}"`
        )
        .join(",")
    );

    return [headers, ...rows].join("\n");
  }
  function downloadCSV(data, filename = "autos_backup.csv") {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="admin-cars-container">
      <div className="admin-container-table">
        <h2 className="admin-h2-text">
          <FaClipboardList /> Lista de Autos
        </h2>
        <div className="admin-toolbar">
          <button
            className="backup-button"
            id="backup-button"
            onClick={() => downloadCSV(cars)}
          >
            <FaDownload /> Backup
          </button>

          <div className="search-container">
            <CiSearch className="search-icon-admin" />
            <input
              type="text"
              placeholder="Buscar"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="create-button"
            onClick={() => {
              setEditingCar(null);
              setNewCar({
                name: "",
                category: "",
                image: null,
                passengers: "",
                transmission: "",
                price: "",
                brand: "",
                estado: "",
              });
              setFormErrors({});
              setShowModal(true);
            }}
          >
            <FaPlus /> Agregar
          </button>
        </div>
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
              {filteredCars.map((car) => (
                <tr key={car.id} className="administration-row">
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
                        setNewCar({
                          name: car.name,
                          category: car.category,
                          image: null,
                          passengers: car.passengers,
                          transmission: car.transmission,
                          price: car.price,
                          brand: car.brand,
                          estado: car.state,
                        });
                        setEditingCar(car);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit className="adm-icon-edit" /> Editar
                    </button>

                    <button
                      className="administration-button-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(car.id);
                      }}
                    >
                      <RiDeleteBin6Line className="adm-icon-delete" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay-cars">
          <div className="modal-content-cars">
            <h2 className="create-text-cars">
              <IoSettingsSharp className="create-icon-cars" />
              {editingCar ? "Editar auto" : "Crear auto"}
            </h2>

            <form
              onSubmit={editingCar ? handleUpdate : handleCreate}
              className="car-form"
            >
              <div className="image-inputs-container">
                <div
                  className="cars-image-wrapper"
                  onClick={() =>
                    document.getElementById("car-image-input").click()
                  }
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
                      {formErrors.image || ""}{" "}
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
                      {formErrors.name || ""}{" "}
                    </p>
                  </div>
                  <div className="input-container">
                    <Select
                      className="select-options"
                      options={categoryOptions}
                      placeholder="Categoría"
                      onChange={(selectedOption) =>
                        setNewCar({ ...newCar, category: selectedOption.value })
                      }
                      menuPosition="fixed"
                      menuPortalTarget={document.body}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderRadius: "8px",
                          outline: "none",
                          borderColor: state.isFocused
                            ? "#6366f1"
                            : provided.borderColor,
                          boxShadow: state.isFocused
                            ? "0 0 0 2px rgba(99, 102, 241, 0.2)"
                            : "none",
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
                      }}
                    />
                    <p
                      className={`error-admin-input ${
                        formErrors.category ? "visible" : ""
                      }`}
                    >
                      {formErrors.category || ""}{" "}
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
                      {formErrors.passengers || ""}{" "}
                    </p>
                  </div>
                  <div className="input-container">
                    <Select
                      className="select-options"
                      options={transmissionOptions}
                      placeholder="Transmisión"
                      onChange={(selectedOption) =>
                        setNewCar({
                          ...newCar,
                          transmission: selectedOption.value,
                        })
                      }
                      menuPosition="fixed"
                      menuPortalTarget={document.body}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderRadius: "8px",
                          outline: "none",
                          borderColor: state.isFocused
                            ? "#6366f1"
                            : provided.borderColor,
                          boxShadow: state.isFocused
                            ? "0 0 0 2px rgba(99, 102, 241, 0.2)"
                            : "none",
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
                      }}
                    />
                    <p
                      className={`error-admin-input ${
                        formErrors.transmission ? "visible" : ""
                      }`}
                    >
                      {formErrors.transmission || ""}{" "}
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
                      {formErrors.price || ""}{" "}
                    </p>
                  </div>
                  <div className="input-container">
                    <Select
                      className="select-options"
                      options={brandOptions}
                      placeholder="Marca"
                      onChange={(selectedOption) =>
                        setNewCar({ ...newCar, brand: selectedOption.value })
                      }
                      menuPosition="fixed"
                      menuPortalTarget={document.body}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderRadius: "8px",
                          outline: "none",
                          borderColor: state.isFocused
                            ? "#6366f1"
                            : provided.borderColor,
                          boxShadow: state.isFocused
                            ? "0 0 0 2px rgba(99, 102, 241, 0.2)"
                            : "none",
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
                      }}
                    />
                    <p
                      className={`error-admin-input ${
                        formErrors.brand ? "visible" : ""
                      }`}
                    >
                      {formErrors.brand || ""}{" "}
                    </p>
                  </div>
                  <div className="input-container">
                    <Select
                      className="select-options"
                      options={stateOptions}
                      placeholder="Estado"
                      onChange={(selectedOption) =>
                        setNewCar({ ...newCar, estado: selectedOption.value })
                      }
                      menuPosition="fixed"
                      menuPortalTarget={document.body}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderRadius: "8px",
                          outline: "none",
                          borderColor: state.isFocused
                            ? "#6366f1"
                            : provided.borderColor,
                          boxShadow: state.isFocused
                            ? "0 0 0 2px rgba(99, 102, 241, 0.2)"
                            : "none",
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
                      }}
                    />
                    <p
                      className={`error-admin-input ${
                        formErrors.estado ? "visible" : ""
                      }`}
                    >
                      {formErrors.estado || ""}{" "}
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
      )}
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};
export default CarsAdmin;
