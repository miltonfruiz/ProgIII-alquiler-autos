import { useEffect, useState } from "react";
import "./CarsAdmin.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaClipboardList, FaPlus, FaDownload } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const CarsAdmin = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    name: "",
    category: "",
    image: "",
    passengers: 0,
    transmission: "",
    price: 0,
    brand: "",
    date: "",
    tax: 0,
    paymentMethod: "",
    billing: "",
    total: 0,
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
        image: "",
        passengers: 0,
        transmission: "",
        price: 0,
        brand: "",
        date: "",
        tax: 0,
        paymentMethod: "",
        billing: "",
        total: 0,
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
            <h2>Crear nuevo auto</h2>
            <form onSubmit={handleCreate} className="car-form">
              <input
                type="text"
                placeholder="Nombre"
                value={newCar.name}
                onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
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
                type="text"
                placeholder="Imagen URL"
                value={newCar.image}
                onChange={(e) =>
                  setNewCar({ ...newCar, image: e.target.value })
                }
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
              <input
                type="text"
                placeholder="Transmisión"
                value={newCar.transmission}
                onChange={(e) =>
                  setNewCar({ ...newCar, transmission: e.target.value })
                }
                required
              />
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
                onChange={(e) => setNewCar({ ...newCar, date: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Impuesto"
                value={newCar.tax}
                onChange={(e) => setNewCar({ ...newCar, tax: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Método de Pago"
                value={newCar.paymentMethod}
                onChange={(e) =>
                  setNewCar({ ...newCar, paymentMethod: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Facturación"
                value={newCar.billing}
                onChange={(e) =>
                  setNewCar({ ...newCar, billing: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Total"
                value={newCar.total}
                onChange={(e) =>
                  setNewCar({ ...newCar, total: e.target.value })
                }
                required
              />
              <select
                value={newCar.status}
                onChange={(e) =>
                  setNewCar({ ...newCar, status: e.target.value })
                }
              >
                <option value="disponible">Disponible</option>
                <option value="no disponible">No disponible</option>
              </select>
              <button type="submit">Crear auto</button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-button-cars"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsAdmin;
