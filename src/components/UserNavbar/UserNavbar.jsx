import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./UserNavbar.css";
import { CiSearch, CiEdit } from "react-icons/ci";
import { VscSettings, VscColorMode } from "react-icons/vsc";
import { FaCar, FaUserEdit } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../Mode/Mode";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    // lógica para cerrar sesión
    console.log("Cerrando sesión...");
    navigate("/login");
  };
  const changeLanguage = () => {
    console.log("Cambiar idioma");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-wrapper">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="navbar-logo"
            onClick={() => navigate("/testhome")}
          />
        </div>
      </div>
      <div className="navbar-center">
        <div className="search-wrapper">
          <CiSearch size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Ingrese nombre o modelo de auto..."
            className="navbar-search"
          />
          <button className="navbar-filter">
            <VscSettings size={18} className="search-icon" />
          </button>
        </div>
      </div>
      <div className="navbar-right">
        <div className="icon-wrapper">
          <Link to="/cars">
            <FaCar className="faCar-icon" />
          </Link>
          <div className="user-dropdown" ref={dropdownRef}>
            <FaUserEdit
              className="faUserEdit-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={changeLanguage}>
                  <IoLanguage className="icon-item-profile" /> Idioma
                </button>
                <button onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <>
                      <FiSun className="icon-item-profile" /> Modo claro
                    </>
                  ) : (
                    <>
                      <FiMoon className="icon-item-profile" /> Modo oscuro
                    </>
                  )}
                </button>
                <button onClick={() => navigate("/user-profile")}>
                  <CiEdit className="icon-item-profile" /> Editar perfil
                </button>
                <button onClick={handleLogout}>
                  <FiLogOut className="icon-item-profile" /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
