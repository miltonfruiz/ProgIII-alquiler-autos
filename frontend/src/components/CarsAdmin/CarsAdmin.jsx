import { useEffect, useState } from "react";
import "./CarsAdmin.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaClipboardList, FaPlus, FaDownload } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { IoSend, IoSettingsSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const CarsAdmin = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    name: "",
    category: "",
    image: null,
    passengers: "",
    transmission: "",
    price: "",
    brand: "",
    date: "",
    tax: "",
    paymentMethod: "",
    billing: "",
    total: "",
    state: "Disponible",
  });
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
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error al eliminar auto:", error);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
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
        date: "",
        tax: "",
        paymentMethod: "",
        billing: "",
        total: "",
        state: "Disponible",
      });
    } catch (error) {
      console.error("Error al crear auto:", error);
    }
  };
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="admin-cars-container">
      <div className="admin-container-table">
        <h2 className="admin-h2-text">
          <FaClipboardList /> Lista de Autos
        </h2>
        <div className="admin-toolbar">
          <button
            className="backup-button"
            onClick={(e) => {
              e.stopPropagation();
              alert("Funcionalidad en desarrollo");
            }}
          >
            <FaDownload /> Backup datos
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
          <button className="create-button" onClick={() => setShowModal(true)}>
            <FaPlus /> Agregar Auto
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
                        alert("Funcionalidad en desarrollo");
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
              <IoSettingsSharp className="create-icon-cars" /> Crear auto
            </h2>
            <form onSubmit={handleCreate} className="car-form">
              <div className="image-inputs-container">
                <div
                  className="cars-image-wrapper"
                  onClick={() =>
                    document.getElementById("car-image-input").click()
                  }
                >
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
                </div>
                <div className="cars-inputs">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={newCar.name}
                    onChange={(e) =>
                      setNewCar({ ...newCar, name: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Categoría"
                    value={newCar.category}
                    onChange={(e) =>
                      setNewCar({ ...newCar, category: e.target.value })
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Pasajeros"
                    value={newCar.passengers}
                    onChange={(e) =>
                      setNewCar({ ...newCar, passengers: e.target.value })
                    }
                    required
                  />
                  <select
                    value={newCar.transmission}
                    onChange={(e) =>
                      setNewCar({ ...newCar, transmission: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Transmisión
                    </option>
                    <option value="manual">Manual</option>
                    <option value="automatica">Automatico</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Precio"
                    value={newCar.price}
                    onChange={(e) =>
                      setNewCar({ ...newCar, price: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Marca"
                    value={newCar.brand}
                    onChange={(e) =>
                      setNewCar({ ...newCar, brand: e.target.value })
                    }
                    required
                  />
                  <input
                    type="date"
                    placeholder="Fecha"
                    value={newCar.date}
                    onChange={(e) =>
                      setNewCar({ ...newCar, date: e.target.value })
                    }
                    required
                  />
                  <select
                    value={newCar.tax}
                    onChange={(e) =>
                      setNewCar({ ...newCar, tax: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Impuesto
                    </option>
                    <option value="unica">Único</option>
                    <option value="mensual">Mensual</option>
                    <option value="anual">Anual</option>
                  </select>
                  <select
                    value={newCar.paymentMethod}
                    onChange={(e) =>
                      setNewCar({ ...newCar, paymentMethod: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Método de Pago
                    </option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Tarjeta de crédito">
                      Tarjeta de crédito
                    </option>
                  </select>
                  <input
                    type="number"
                    placeholder="Facturación"
                    value={newCar.billing}
                    onChange={(e) =>
                      setNewCar({ ...newCar, billing: e.target.value })
                    }
                    required
                  />
                  <select
                    value={newCar.status}
                    onChange={(e) =>
                      setNewCar({ ...newCar, status: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Estado
                    </option>
                    <option value="disponible">Disponible</option>
                    <option value="no disponible">No disponible</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Total"
                    value={newCar.total}
                    onChange={(e) =>
                      setNewCar({ ...newCar, total: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="cars-container-button">
                <button className="create-button-cars" type="submit">
                  <IoSend /> Crear
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="cancel-button-cars"
                >
                  <MdCancel className="cancel-icon-cars" /> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CarsAdmin;
