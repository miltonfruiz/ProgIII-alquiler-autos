import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./UserNavbar.css";
import { CiSearch, CiEdit } from "react-icons/ci";
import { FaCar, FaUserEdit, FaHome } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../Mode/Mode";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import { IoMdCheckmark } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { MdDashboardCustomize } from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
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
  const currentLang = i18n.language;
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
        <div className="search-wrapper">
          <CiSearch size={18} className="search-icon" />
          <input
            type="text"
            placeholder={t("navbar.searchPlaceholder")}
            className={`navbar-search ${fade ? "fade-out" : ""}`}
          />
        </div>
      </div>
      <div className="navbar-right">
        <div className="icon-wrapper">
          {userEmail === "admin@test.com" && (
            <div className="nav-item">
              <Link to="/administration" className="nav-link">
                <MdDashboardCustomize className="faAdmin-icon nav-icon" />
                <span className="nav-title">Panel</span>
              </Link>
            </div>
          )}
          <div className="nav-item">
            <Link to="/home" className="nav-link">
              <FaHome title="Inicio" className="faHome-icon nav-icon" />
              <span className="nav-title">Inicio</span>
            </Link>
          </div>
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
              <span className="nav-title">Reservas</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/shop" className="nav-link">
              {" "}
              <FaCar
                title="Tienda de Autos"
                className="faCar-icon nav-icon"
              />{" "}
              <span className="nav-title">Tienda</span>
            </Link>
          </div>
          <div className="user-dropdown nav-item nav-link" ref={dropdownRef}>
            <FaUserEdit
              className="faUserEdit-icon nav-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            />{" "}
            <span className="nav-title">Perfil</span>
            {showDropdown && (
              <div
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={`fade-button ${fade ? "fade-out" : ""}`}
                  onClick={() => setShowLanguages((prev) => !prev)}
                >
                  <IoLanguage className="icon-item-profile" />{" "}
                  {t("navbar.language")}
                </button>
                {showLanguages && (
                  <div className="submenu">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`navbar-language ${
                          lang.code === currentLang ? "active-language" : ""
                        }${fade ? " fade-out" : ""}`}
                      >
                        <Flag
                          code={lang.flag}
                          style={{ width: "20px", marginRight: "8px" }}
                        />
                        {t(`navbar.language_${lang.code}`) || lang.name}
                        {lang.code === currentLang && (
                          <IoMdCheckmark
                            size={14}
                            style={{ marginLeft: "8px" }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className={`fade-button ${fade ? "fade-out" : ""}`}
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <>
                      <FiSun className="icon-item-profile" />{" "}
                      {t("navbar.themeLight")}
                    </>
                  ) : (
                    <>
                      <FiMoon className="icon-item-profile" />{" "}
                      {t("navbar.themeDark")}
                    </>
                  )}
                </button>
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
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
}
