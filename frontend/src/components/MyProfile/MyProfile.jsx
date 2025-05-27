import { useState, useRef } from "react";
import "./MyProfile.css";
import { ImProfile } from "react-icons/im";
import { FaSignature } from "react-icons/fa6";
import { MdDateRange, MdCancel } from "react-icons/md";
import { FaRegAddressCard, FaCarSide, FaSave, FaEdit } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

export default function MyProfile() {
  const [editMode, setEditMode] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: "Maria San Juan",
    nacimiento: "1992-03-20",
    dni: "39484200",
    licencia: "39489200",
  });
  const [profileImage, setProfileImage] = useState("/images/profile.png");
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
  const handleSave = () => {
    setAnimateOut(true);
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
          <h2>
            <FaSignature className="icon-date" />
            {editMode ? (
              <input
                type="text"
                name="nombre"
                value={profileData.nombre}
                onChange={handleChange}
                className={animateOut ? "fade-out" : "fade-in"}
              />
            ) : (
              profileData.nombre
            )}
          </h2>
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
