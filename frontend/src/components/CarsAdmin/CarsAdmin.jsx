import { useEffect, useState } from "react";
import "./CarsAdmin.css";
import { FaPlus, FaDownload } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import CardAdminValidation from "../CarAdminValidation/CarAdminValidation";
import CarsAdminModal from "../CarAdminModal/CarAdminModal";
import CarsAdminTable from "../CarsAdminTable/CarsAdminTable";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import {
  downloadCSV,
  categoryOptions,
  stateOptions,
  transmissionOptions,
  brandOptions,
} from "../CarsAdminUtils/CarsAdminUtils";

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
  const [carToDelete, setCarToDelete] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setCars([...data]))
      .catch((err) => console.error("Error al traer autos:", err));
  }, []);
  const handleDelete = async (car) => {
    try {
      await fetch(`http://localhost:3000/cars/${car.id}`, {
        method: "DELETE",
      });
      toast.success("Auto borrado correctamente!");
      setCars(cars.filter((c) => c.id !== car.id));
    } catch (error) {
      console.error("Error al eliminar auto:", error);
    }
  };
  const confirmDelete = async () => {
    if (carToDelete) {
      await handleDelete(carToDelete);
      setCarToDelete(null);
    }
  };
  const cancelDelete = () => {
    setCarToDelete(null);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const errors = CardAdminValidation(newCar);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const formData = new FormData();
      Object.entries(newCar).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
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
      resetForm();
    } catch (error) {
      console.error("Error al crear auto:", error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = CardAdminValidation(newCar);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const formData = new FormData();
      Object.entries(newCar).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
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
      resetForm();
    } catch (error) {
      console.error("Error al actualizar auto:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };
  const resetForm = () => {
    setEditingCar(null);
    setFormErrors({});
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
  };
  const filteredCars = cars.filter((car) =>
    car.name?.toLowerCase().includes(search.toLowerCase())
  );
  const handleDownloadCars = () => {
    const options = {
      excludeFields: ["createdAt", "updatedAt", "image"],
      fieldFormatters: {
        price: (value) => `$${value.toLocaleString()}`,
        estado: (value) =>
          value === "available" ? "Disponible" : "No disponible",
      },
      headerNames: {
        name: "Modelo",
        category: "Categoría",
        passengers: "Pasajeros",
        transmission: "Transmisión",
        price: "Precio",
        brand: "Marca",
        estado: "Estado",
      },
    };

    downloadCSV(cars, "autos_backup.csv", options);
  };
  return (
    <div className="admin-cars-container">
      <div className="admin-container-table">
        <h2 className="admin-h2-text">Lista de Autos</h2>
        <div className="admin-toolbar">
          <button className="backup-button" onClick={handleDownloadCars}>
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
              resetForm();
              setShowModal(true);
            }}
          >
            <FaPlus /> Agregar
          </button>
        </div>
        <CarsAdminTable
          cars={filteredCars}
          onEdit={(car) => {
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
          onDelete={(car) => setCarToDelete(car)}
          search={search}
        />
      </div>
      {carToDelete && (
        <ConfirmDeleteModal
          itemName={carToDelete.name}
          itemType="el auto"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showModal && (
        <CarsAdminModal
          newCar={newCar}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={editingCar ? handleUpdate : handleCreate}
          handleCloseModal={handleCloseModal}
          setNewCar={setNewCar}
          editingCar={editingCar}
          categoryOptions={categoryOptions}
          transmissionOptions={transmissionOptions}
          brandOptions={brandOptions}
          stateOptions={stateOptions}
        />
      )}
    </div>
  );
};
export default CarsAdmin;
