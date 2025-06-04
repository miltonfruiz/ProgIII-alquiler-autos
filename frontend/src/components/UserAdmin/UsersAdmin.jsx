import { useEffect, useState } from "react";
import "./UsersAdmin.css";
import { FaClipboardList, FaPlus, FaEdit, FaDownload } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import UsersTableAdmin from "../UsersTableAdmin/UsersTableAdmin";
import UsersModalAdmin from "../UsersModalAdmin/UsersModalAdmin";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { UsersValidationAdmin } from "../UsersValidationAdmin/UsersValidationAdmin";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    repetirContraseña: "",
    dni: "",
    nacimiento: "",
    licencia: "",
    numeroTelefonico: "",
    rol: "usuario",
  });
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Respuesta inesperada del backend:", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error al obtener usuarios:", err);
        setUsers([]);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const errors = UsersValidationAdmin(newUser);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const { repetirContraseña, ...userToSend } = newUser;

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const response = await res.json();
        console.error("Respuesta del backend:", response);
        toast.error(
          response.error || response.errors || "Error al crear usuario"
        );
        return;
      }

      const createdUser = await res.json();
      setUsers([...users, createdUser]);
      toast.success("Usuario creado correctamente");
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = UsersValidationAdmin(newUser);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const res = await fetch(`http://localhost:3000/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Error al actualizar usuario");
        return;
      }
      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      toast.success("Usuario actualizado");
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((u) => u.id !== id));
      toast.success("Usuario eliminado");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };
  const confirmDelete = () => {
    if (userToDelete) {
      handleDelete(userToDelete.id);
      setUserToDelete(null);
    }
  };
  const cancelDelete = () => {
    setUserToDelete(null);
  };
  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };
  const resetForm = () => {
    setEditingUser(null);
    setFormErrors({});
    setNewUser({
      nombre: "",
      apellido: "",
      correo: "",
      contraseña: "",
      repetirContraseña: "",
      dni: "",
      nacimiento: "",
      licencia: "",
      numeroTelefonico: "",
      rol: "usuario",
    });
  };
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        `${user.nombre} ${user.apellido}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];
  return (
    <div className="admin-users-container">
      <div className="admin-container-table">
        <h2 className="admin-h2-text">
          <FaClipboardList /> Lista de Usuarios
        </h2>
        <div className="admin-toolbar">
          <button className="backup-button">
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
        <UsersTableAdmin
          users={filteredUsers}
          onEdit={(user) => {
            setNewUser({
              nombre: user.nombre,
              apellido: user.apellido,
              correo: user.correo,
              contraseña: "",
              repetirContraseña: "",
              dni: user.dni,
              nacimiento: user.nacimiento,
              licencia: user.licencia,
              numeroTelefonico: user.numeroTelefonico || "",
              rol: user.rol,
            });
            setEditingUser(user);
            setShowModal(true);
          }}
          onDelete={(user) => setUserToDelete(user)}
          search={search}
        />
      </div>
      {showModal && (
        <UsersModalAdmin
          user={newUser}
          editingUser={editingUser}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={editingUser ? handleUpdate : handleCreate}
          handleClose={handleClose}
          setUser={setNewUser}
        />
      )}
      {userToDelete && (
        <ConfirmDeleteModal
          itemName={`${userToDelete.nombre} ${userToDelete.apellido}`}
          itemType="el usuario"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
export default UsersAdmin;
