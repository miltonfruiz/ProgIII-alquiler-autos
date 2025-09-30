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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState("/images/test.jpg");
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [originalProfileImage, setOriginalProfileImage] =
    useState(profileImage);
  const fileInputRef = useRef(null);

  //Errores
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        toast.error(t("Imagen invalida"));
        return;
      }

      // Validar tamaño
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("Imagen muy pesada"));
        return;
      }

      setProfileImage(URL.createObjectURL(file));
    }
  };

  const triggerImageSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.nombre.trim()) {
      newErrors.nombre = t("Campo obligatorio");
    }

    if (!profileData.apellido.trim()) {
      newErrors.apellido = t("Campo obligatorio");
    }

    if (!profileData.correo.trim()) {
      newErrors.correo = t("Campo obligatorio");
    } else if (!/\S+@\S+\.\S+/.test(profileData.correo)) {
      newErrors.correo = t("Email Invalido");
    }

    if (!profileData.dni.trim()) {
      newErrors.dni = t("profile.errors.requiredField");
    }

    if (!profileData.numeroTelefonico.trim()) {
      newErrors.numeroTelefonico = t("profile.errors.requiredField");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = () => {
    setOriginalProfileData(profileData);
    setOriginalProfileImage(profileImage);
    setEditMode(true);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error(t("profile.errors.fixErrors"));
      return;
    }

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
        toast.error(t("saveError"));
      } else {
        toast.success(t("profile.success.saveSuccess"));
        // Actualizar datos originales después de guardar
        setOriginalProfileData(profileData);
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      toast.error(t("connectionError"));
    }

    setTimeout(() => {
      setAnimateOut(false);
      setEditMode(false);
    }, 300);
  };

  const handleCancel = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setProfileData(originalProfileData);
      setProfileImage(originalProfileImage);
      setAnimateOut(false);
      setEditMode(false);
      setErrors({});
    }, 300);
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
          toast.error(t("loadError"));
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        toast.error(t("connectionError"));
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <div className={`profile-card ${animateOut ? "fade-out" : "fade-in"}`}>
        <div className="profile-header">
          <div className="title-section">
            <ImProfile className="title-icon" />
            <h2 className="profile-title">{t("navbar.myDates")}</h2>
          </div>

          {!editMode && (
            <button className="edit-profile-btn" onClick={handleEditToggle}>
              {t("navbar.buttonEdit")}
            </button>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-image-section">
            <div
              className="image-wrapper"
              onClick={editMode ? triggerImageSelect : undefined}
            >
              <img
                src={profileImage}
                alt="Foto de perfil"
                className={`profile-image ${editMode ? "editable" : ""}`}
              />
              {editMode && (
                <div className="image-overlay">
                  <AiFillEdit className="edit-icon" />
                  <span className="edit-text">{t("Cambiar Foto")}</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div className="profile-details">
            <div className="details-grid">
              {/* Nombre y Apellido */}
              <div className="detail-row dual-input">
                <div className="input-group">
                  <label className="field-label">
                    <FaUser className="field-icon" />
                    {t("Nombre")}
                  </label>
                  {editMode ? (
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="nombre"
                        value={profileData.nombre}
                        onChange={handleChange}
                        className={errors.nombre ? "error" : ""}
                      />
                      {errors.nombre && (
                        <span className="error-message">{errors.nombre}</span>
                      )}
                    </div>
                  ) : (
                    <span className="field-value">{profileData.nombre}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="field-label">
                    <FaUser className="field-icon" />
                    {t("Apellido")}
                  </label>
                  {editMode ? (
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="apellido"
                        value={profileData.apellido}
                        onChange={handleChange}
                        className={errors.apellido ? "error" : ""}
                      />
                      {errors.apellido && (
                        <span className="error-message">{errors.apellido}</span>
                      )}
                    </div>
                  ) : (
                    <span className="field-value">{profileData.apellido}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="detail-row">
                <div className="input-group">
                  <label className="field-label">
                    <IoIosMail className="field-icon" />
                    {t("Email")}
                  </label>
                  {editMode ? (
                    <div className="input-wrapper">
                      <input
                        type="email"
                        name="correo"
                        value={profileData.correo}
                        onChange={handleChange}
                        className={errors.correo ? "error" : ""}
                      />
                      {errors.correo && (
                        <span className="error-message">{errors.correo}</span>
                      )}
                    </div>
                  ) : (
                    <span className="field-value">{profileData.correo}</span>
                  )}
                </div>
              </div>

              {/* Licencia */}
              <div className="detail-row">
                <div className="input-group">
                  <label className="field-label">
                    <FaCarSide className="field-icon" />
                    {t("navbar.numberLicense")}
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="licencia"
                      value={profileData.licencia}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="field-value">{profileData.licencia}</span>
                  )}
                </div>
              </div>

              {/* Teléfono */}
              <div className="detail-row">
                <div className="input-group">
                  <label className="field-label">
                    <FaMobileAlt className="field-icon" />
                    {t("navbar.phone")}
                  </label>
                  {editMode ? (
                    <div className="input-wrapper">
                      <input
                        type="tel"
                        name="numeroTelefonico"
                        value={profileData.numeroTelefonico}
                        onChange={handleChange}
                        className={errors.numeroTelefonico ? "error" : ""}
                      />
                      {errors.numeroTelefonico && (
                        <span className="error-message">
                          {errors.numeroTelefonico}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="field-value">
                      {profileData.numeroTelefonico}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {editMode && (
              <div className="action-buttons">
                <button className="btn-save" onClick={handleSave}>
                  <FaSave className="btn-icon" />
                  {t("navbar.buttonSave")}
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  <MdCancel className="btn-icon" />
                  {t("navbar.buttonCancel")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
