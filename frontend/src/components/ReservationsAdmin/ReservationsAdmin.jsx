import { useEffect, useState } from "react";
import AdminTable from "../AdminTable/AdminTable";
import "../AdminTable/AdminTable.css";
import { FaPlus, FaDownload } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { toast } from "react-toastify";
import { downloadCSV } from "../CarsAdminUtils/CarsAdminUtils";
import ReservationsModalAdmin from "../ReservationsModalAdmin/ReservationsModalAdmin";
import { ReservationsValidationAdmin } from "../ReservationsValidationAdmin/ReservationsValidationAdmin";

const ReservationsAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [newReservation, setNewReservation] = useState({
    userId: "",
    carId: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsers, resCars, resReservas] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/cars"),
          fetch("http://localhost:3000/reservas"),
        ]);

        const usersData = await resUsers.json();
        const carsData = await resCars.json();
        const reservasData = await resReservas.json();

        setUsers(usersData);
        setAllUsers(usersData);
        setCars(carsData);
        setAllCars(carsData);
        setReservations(Array.isArray(reservasData) ? reservasData : []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);
  const filteredReservations = Array.isArray(reservations)
    ? reservations.filter((res) => {
        const fullName =
          `${res.User?.nombre} ${res.User?.apellido}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      })
    : [];
  const handleDelete = async (id_reserva) => {
    try {
      const res = await fetch(`http://localhost:3000/reservas/${id_reserva}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setReservations((prev) =>
        prev.filter((r) => r.id_reserva !== id_reserva)
      );
      setReservationToDelete(null);
      toast.success("Reserva eliminada correctamente");
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      toast.error("Hubo un problema al eliminar la reserva.");
    }
  };

  const confirmDelete = () => {
    if (reservationToDelete) {
      handleDelete(reservationToDelete.id_reserva);
      setReservationToDelete(null);
    }
  };
  const cancelDelete = () => {
    setReservationToDelete(null);
  };
  const handleEdit = (reserva) => {
    setEditingReservation(reserva);
    setNewReservation({
      userId: reserva.userId,
      carId: reserva.carId,
      fecha_inicio: reserva.fecha_inicio,
      fecha_fin: reserva.fecha_fin,
    });
    setFormErrors({});
    setShowModal(true);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = ReservationsValidationAdmin(newReservation);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch(
        `http://localhost:3000/reservas/${editingReservation.id_reserva}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReservation),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar reserva");

      const updated = await res.json();

      toast.success("Reserva actualizada correctamente");
      setReservations((prev) =>
        prev.map((r) => (r.id_reserva === updated.id_reserva ? updated : r))
      );
      setShowModal(false);
      setEditingReservation(null);
      setNewReservation({
        userId: "",
        carId: "",
        fecha_inicio: "",
        fecha_fin: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al editar la reserva.");
    }
  };
  const handleCreate = () => {
    setShowModal(true);
    setFormErrors({});
    setNewReservation({
      userId: "",
      carId: "",
      fecha_inicio: "",
      fecha_fin: "",
    });
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const errors = ReservationsValidationAdmin(newReservation);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      });

      if (!res.ok) throw new Error("Error al crear reserva");

      const data = await res.json();

      toast.success("Reserva creada exitosamente");
      setReservations((prev) => [...prev, data.reserva]);
      setShowModal(false);
      setNewReservation({
        userId: "",
        carId: "",
        fecha_inicio: "",
        fecha_fin: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al crear la reserva.");
    }
  };
  const columns = [
    "Cliente",
    "Auto",
    "Inicio",
    "Fin",
    "Estado",
    "Días",
    "Reservado",
  ];
  const fields = [
    (res) => `${res.User?.nombre} ${res.User?.apellido}`,
    (res) => `${res.Car?.brand} ${res.Car?.name}`,
    (res) => new Date(res.fecha_inicio).toLocaleDateString("es-AR"),
    (res) => new Date(res.fecha_fin).toLocaleDateString("es-AR"),
    (res) => res.estado_reserva,
    (res) => res.cant_dias,
    (res) => new Date(res.fecha_reserva).toLocaleDateString("es-AR"),
  ];
  const handleDownloadBackup = () => {
    const exportData = reservations.map((reservation) => ({
      id: reservation.id_reserva,
      cliente: `${reservation.User?.nombre} ${reservation.User?.apellido}`,
      email: reservation.User?.correo,
      auto: `${reservation.Car?.brand} ${reservation.Car?.name}`,
      fecha_inicio: reservation.fecha_inicio,
      fecha_fin: reservation.fecha_fin,
      dias: reservation.cant_dias,
      estado: reservation.estado_reserva,
      fecha_reserva: reservation.fecha_reserva,
      precio_total: reservation.precio_total,
      metodo_pago: reservation.metodo_pago,
    }));

    const options = {
      headerNames: {
        id: "ID Reserva",
        cliente: "Cliente",
        email: "Email",
        auto: "Auto",
        fecha_inicio: "Fecha Inicio",
        fecha_fin: "Fecha Fin",
        dias: "Días",
        estado: "Estado",
        fecha_reserva: "Fecha Reserva",
        precio_total: "Precio Total",
        metodo_pago: "Método de Pago",
      },
      fieldFormatters: {
        fecha_inicio: (value) => new Date(value).toLocaleDateString("es-AR"),
        fecha_fin: (value) => new Date(value).toLocaleDateString("es-AR"),
        fecha_reserva: (value) => new Date(value).toLocaleDateString("es-AR"),
        precio_total: (value) => `$${value?.toLocaleString("es-AR")}`,
      },
    };

    downloadCSV(exportData, "reservas_backup.csv", options);
  };
  return (
    <div className="admin-reservations-container">
      <div className="admin-container-table">
        <h2 className="admin-h2-text">Lista de Reservas</h2>
        <div className="admin-toolbar">
          <button className="backup-button" onClick={handleDownloadBackup}>
            <FaDownload /> Backup
          </button>
          <div className="search-container">
            <CiSearch className="search-icon-admin" />
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="create-button" onClick={handleCreate}>
            <FaPlus /> Agregar
          </button>
        </div>
        <AdminTable
          data={filteredReservations}
          columns={columns}
          fields={fields}
          onEdit={handleEdit}
          onDelete={(reserva) => setReservationToDelete(reserva)}
          search={search}
        />
      </div>
      {reservationToDelete && (
        <ConfirmDeleteModal
          itemName={`Reserva de ${reservationToDelete.User?.nombre} ${reservationToDelete.User?.apellido}`}
          itemType="la reserva"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showModal && (
        <ReservationsModalAdmin
          users={users}
          cars={cars}
          newReservation={newReservation}
          setNewReservation={setNewReservation}
          onClose={() => {
            setShowModal(false);
            setEditingReservation(null);
          }}
          onSubmit={editingReservation ? handleEditSubmit : handleCreateSubmit}
          formErrors={formErrors}
          editingReservation={!!editingReservation}
        />
      )}
    </div>
  );
};

export default ReservationsAdmin;
