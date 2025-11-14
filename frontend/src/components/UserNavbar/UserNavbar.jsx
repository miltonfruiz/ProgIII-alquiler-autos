import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./UserNavbar.css";
import { CiEdit } from "react-icons/ci";
import { FaCar, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useTheme } from "../Mode/Mode";
import { useTranslation } from "react-i18next";
import { BsCalendarDateFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { MdDashboardCustomize } from "react-icons/md";
import SearchNavbar from "../SearchNavBar/SearchNavbar";

import "react-toastify/dist/ReactToastify.css";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  //State para el menu movil
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const [showLanguages, setShowLanguages] = useState(false);
  const { t, i18n } = useTranslation();
  const [fade, setFade] = useState(false);
  const location = useLocation();
  const isOnEditProfile = location.pathname === "/user-profile";
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const userEmail = loggedUser?.email;

  const languages = [
    { code: "es", name: "Español", flag: "AR" },
    { code: "en", name: "English", flag: "US" },
    { code: "pt", name: "Português", flag: "BR" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("lang");
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
    localStorage.removeItem("loggedUser");
    toast.success("Cerrando Sesión...", {
      position: "top-right",
      autoClose: 2000,
      theme: theme === "dark" ? "dark" : "light",
    });

    setTimeout(() => {
      navigate("/");
    }, 4000);
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

  const changeLanguage = (lang) => {
    setFade(true);
    setTimeout(() => {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
      setFade(false);
    }, 150);
  };

  useEffect(() => {
    if (!showDropdown) {
      setShowLanguages(false);
    }
  }, [showDropdown]);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const currentLang = i18n.language;
  const isAdmin = loggedUser?.rol === "administrador";
  const isEmpleado = loggedUser?.rol === "empleado";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-wrapper">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="navbar-logo"
            onClick={() => navigate("/home")}
          />
        </div>
      </div>

      <div className="navbar-center">
        <SearchNavbar />
      </div>

      <div className="navbar-right">
        {/* Iconos para desktop/tablet */}
        <div className="icon-wrapper">
          {isAdmin && (
            <div className="nav-item">
              <Link to="/administration" className="nav-link">
                <MdDashboardCustomize className="faAdmin-icon nav-icon" />
                <span className="nav-title">{t("navbar.dashboard")}</span>
              </Link>
            </div>
          )}
          {isEmpleado && (
            <div className="nav-item">
              <Link to="/empleados" className="nav-link">
                <MdDashboardCustomize className="faAdmin-icon nav-icon" />
                <span className="nav-title">{t("navbar.dashboard")}</span>
              </Link>
            </div>
          )}
          <div className="nav-item">
            <Link
              to="/user-profile"
              className="nav-link"
              onClick={() => {
                setTimeout(() => {
                  const target = document.getElementById(
                    "my-reservations-link"
                  );
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }, 500);
              }}
            >
              <BsCalendarDateFill className="BsCalendarDateFill-icon nav-icon" />
              <span className="nav-title">{t("navbar.reservations")}</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/shop" className="nav-link">
              <FaCar title="Tienda de Autos" className="faCar-icon nav-icon" />
              <span className="nav-title">{t("navbar.shop")}</span>
            </Link>
          </div>
          <div className="user-dropdown nav-item nav-link" ref={dropdownRef}>
            <FaUser
              className="faUserEdit-icon nav-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            <span className="nav-title">
              {loggedUser ? t("navbar.profile") : "Cuenta"}
            </span>
            {showDropdown && (
              <div
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                {loggedUser ? (
                  <>
                    {/* Solo mostrar estas opciones cuando el usuario está logueado */}
                    <button
                      onClick={() => {
                        if (!isOnEditProfile) {
                          setFade(true);
                          setTimeout(() => navigate("/user-profile"), 300);
                        }
                      }}
                      className={`fade-button ${fade ? "fade-out" : ""}`}
                    >
                      <CiEdit className="icon-item-profile" />
                      {t("navbar.editProfile")}
                    </button>
                    <button
                      onClick={() => {
                        setFade(true);
                        setTimeout(() => handleLogout(), 300);
                      }}
                      className={`fade-button ${fade ? "fade-out" : ""}`}
                    >
                      <FiLogOut className="icon-item-profile" />
                      {t("navbar.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    {/* Mostrar Login y Registro cuando el usuario NO está logueado */}
                    <button
                      onClick={() => {
                        setFade(true);
                        setTimeout(() => navigate("/login"), 300);
                      }}
                      className={`fade-button ${fade ? "fade-out" : ""}`}
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      onClick={() => {
                        setFade(true);
                        setTimeout(() => navigate("/register"), 300);
                      }}
                      className={`fade-button ${fade ? "fade-out" : ""}`}
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Menú hamburguesa para móvil */}
        <div
          className={`hamburger-menu ${showMobileMenu ? "active" : ""}`}
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`mobile-menu ${showMobileMenu ? "active" : ""}`}>
        {userEmail === "admin@test.com" && (
          <div className="nav-item">
            <Link to="/administration" className="nav-link">
              <MdDashboardCustomize className="nav-icon" />
              <span className="nav-title">{t("navbar.dashboard")}</span>
            </Link>
          </div>
        )}
        <div className="nav-item">
          <Link
            to="/user-profile"
            className="nav-link"
            onClick={() => {
              setTimeout(() => {
                const target = document.getElementById("my-reservations-link");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }, 500);
            }}
          >
            <BsCalendarDateFill className="nav-icon" />
            <span className="nav-title">
              {t("navbar.reservations") || "Reservas"}
            </span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/shop" className="nav-link">
            <FaCar className="nav-icon" />
            <span className="nav-title">{t("navbar.shop") || "Tienda"}</span>
          </Link>
        </div>
        {loggedUser && (
          <>
            <div className="nav-item">
              <Link to="/user-profile" className="nav-link">
                <CiEdit className="nav-icon" />
                <span className="nav-title">{t("navbar.editProfile")}</span>
              </Link>
            </div>

            <div className="nav-item" onClick={handleLogout}>
              <div className="nav-link">
                <FiLogOut className="nav-icon" />
                <span className="nav-title">{t("navbar.logout")}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <ToastContainer />
    </nav>
  );
}
