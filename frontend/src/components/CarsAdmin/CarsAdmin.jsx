import { useEffect, useState } from "react";
import "./CarsAdmin.css";

const CarsAdmin = () => {
  const [cars, setCars] = useState([]);
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
    status: "disponible",
  });
  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Error al traer autos:", err));
  }, []);
  const handleDelete = async (id) => {
    try {
      await fetch(`/cars/${id}`, { method: "DELETE" });
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error al eliminar auto:", error);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      const data = await res.json();
      setCars([...cars, data]);
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
        status: "disponible",
      });
    } catch (error) {
      console.error("Error al crear auto:", error);
    }
  };

  return (
    <div className="admin-cars-container">
      <h2>Lista de Autos</h2>
      <table>
        <thead>
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
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.category}</td>
              <td>${car.price}</td>
              <td>{car.transmission}</td>
              <td>{car.passengers}</td>
              <td>{car.brand}</td>
              <td>{car.status}</td>
              <td>
                <button onClick={() => handleDelete(car.id)}>Eliminar</button>
                <button
                  onClick={() => alert("Funcionalidad editar en desarrollo")}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Imagen URL"
          value={newCar.image}
          onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Pasajeros"
          value={newCar.passengers}
          onChange={(e) => setNewCar({ ...newCar, passengers: e.target.value })}
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
          onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Marca"
          value={newCar.brand}
          onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
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
          onChange={(e) => setNewCar({ ...newCar, billing: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Total"
          value={newCar.total}
          onChange={(e) => setNewCar({ ...newCar, total: e.target.value })}
          required
        />
        <select
          value={newCar.status}
          onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
        >
          <option value="disponible">Disponible</option>
          <option value="no disponible">No disponible</option>
        </select>
        <button type="submit">Crear auto</button>
      </form>
    </div>
  );
};

export default CarsAdmin;
