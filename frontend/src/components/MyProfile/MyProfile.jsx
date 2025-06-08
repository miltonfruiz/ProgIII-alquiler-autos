import { useState, useRef, useEffect } from "react";
import "./MyProfile.css";
import { ImProfile } from "react-icons/im";
import { MdDateRange, MdCancel } from "react-icons/md";
import {
  FaRegAddressCard,
  FaCarSide,
  FaSave,
  FaEdit,
  FaUser,
  FaMobileAlt,
} from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { toast } from "react-toastify";

export default function MyProfile() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const [editMode, setEditMode] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    nacimiento: "",
    dni: "",
    licencia: "",
    numeroTelefonico: "",
  });

  const [profileImage, setProfileImage] = useState("/images/test.jpg");
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [originalProfileImage, setOriginalProfileImage] =
    useState(profileImage);
  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  const triggerImageSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handleEditToggle = () => {
    setOriginalProfileData(profileData);
    setOriginalProfileImage(profileImage);
    setEditMode(true);
  };
  const handleSave = async () => {
    setAnimateOut(true);
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    try {
      const res = await fetch(`http://localhost:3000/users/${loggedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Error al actualizar:", data.error);
      } else {
        toast.success("Perfil actualizado");
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }

    setTimeout(() => {
      setAnimateOut(false);
      setEditMode(false);
    }, 100);
  };

  const handleCancel = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setProfileData(originalProfileData);
      setProfileImage(originalProfileImage);
      setAnimateOut(false);
      setEditMode(false);
    }, 100);
  };
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser?.id) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/${loggedUser.id}`);
        const data = await res.json();
        if (res.ok) {
          setProfileData({
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            nacimiento: data.nacimiento,
            dni: data.dni,
            licencia: data.licencia,
            numeroTelefonico: data.numeroTelefonico,
          });
          setOriginalProfileData({
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            nacimiento: data.nacimiento,
            dni: data.dni,
            licencia: data.licencia,
            numeroTelefonico: data.numeroTelefonico,
          });
        } else {
          console.error("Error al obtener datos del usuario:", data.error);
        }
      } catch (err) {
        console.error("Error de conexión:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-header">
      <h1 className="profile-title">
        <ImProfile className="imProfile-icon" />
        Mis Datos
      </h1>
      <div className="profile-content">
        <div className="profile-image-wrapper">
          <img
            src={profileImage}
            alt="Foto de perfil"
            className={`img-profile ${editMode ? "editable-img" : ""}`}
            onClick={editMode ? triggerImageSelect : undefined}
            style={{ cursor: editMode ? "pointer" : "default" }}
          />
          {editMode && (
            <div className="edit-icon-overlay" onClick={triggerImageSelect}>
              <AiFillEdit className="camera-icon" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        <div className="profile-details">
          <p>
            <FaUser className="icon-date" /> Nombre:{" "}
            {editMode ? (
              <>
                <input
                  type="text"
                  name="nombre"
                  value={profileData.nombre}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="apellido"
                  value={profileData.apellido}
                  onChange={handleChange}
                  style={{ marginLeft: "8px" }}
                />
              </>
            ) : (
              `${profileData.nombre} ${profileData.apellido}`
            )}
          </p>

          <p>
            <MdDateRange className="icon-date" />
            Fecha de Nacimiento:{" "}
            {editMode ? (
              <input
                type="date"
                name="nacimiento"
                value={profileData.nacimiento}
                onChange={handleChange}
                className={animateOut ? "fade-out" : "fade-in"}
              />
            ) : (
              new Date(profileData.nacimiento).toLocaleDateString("es-AR")
            )}
          </p>
          <p>
            <FaRegAddressCard className="icon-date" />
            DNI:{" "}
            {editMode ? (
              <input
                type="text"
                name="dni"
                value={profileData.dni}
                onChange={handleChange}
                className={animateOut ? "fade-out" : "fade-in"}
              />
            ) : (
              profileData.dni
            )}
          </p>
          <p>
            <FaCarSide className="icon-date" />
            Nº Licencia:{" "}
            {editMode ? (
              <input
                type="text"
                name="licencia"
                value={profileData.licencia}
                onChange={handleChange}
                className={animateOut ? "fade-out" : "fade-in"}
              />
            ) : (
              profileData.licencia
            )}
          </p>
          <p>
            <FaMobileAlt className="icon-date" /> Teléfono:{" "}
            {editMode ? (
              <input
                type="text"
                name="numeroTelefonico"
                value={profileData.numeroTelefonico}
                onChange={handleChange}
              />
            ) : (
              profileData.numeroTelefonico
            )}
          </p>
          <p>
            <IoIosMail className="icon-date" /> Correo: {profileData.correo}
          </p>
          {editMode ? (
            <div
              className={`edit-actions ${animateOut ? "fade-out" : "fade-in"}`}
            >
              <button className="save-button" onClick={handleSave}>
                <FaSave className="icon-edits" /> Guardar
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                <MdCancel className="icon-edits" /> Cancelar
              </button>
            </div>
          ) : (
            <button className="edit-button fade-in" onClick={handleEditToggle}>
              <FaEdit className="FaEdit-icon" />
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
