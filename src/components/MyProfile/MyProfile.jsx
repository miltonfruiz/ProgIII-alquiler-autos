import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { FaSignature } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaRegAddressCard, FaCarSide } from "react-icons/fa";

export default function MyProfile() {
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate("/user-profile");
  };
  return (
    <div className="profile-header">
      <h1 className="profile-title">
        <ImProfile className="imProfile-icon" />
        Mis Datos
      </h1>
      <div className="profile-content">
        <img
          src="/images/profile.png"
          alt="Foto de perfil"
          className="img-profile"
        />
        <div className="profile-details">
          <h2>
            <FaSignature className="icon-date" /> Maria San Juan
          </h2>
          <p>
            <MdDateRange className="icon-date" /> Fecha de Nacimiento:
            20/03/1992
          </p>
          <p>
            <FaRegAddressCard className="icon-date" /> DNI: 39.484.200
          </p>
          <p>
            <FaCarSide className="icon-date" /> Nº Licencia: 39489200
          </p>
          <button className="edit-button" onClick={handleEditProfile}>
            <FiEdit className="fiEdit-icon" />
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
