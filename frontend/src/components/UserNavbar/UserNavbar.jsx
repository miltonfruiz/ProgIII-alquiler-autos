import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./UserNavbar.css";
import { CiEdit } from "react-icons/ci";
import { FaCar, FaUser } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../Mode/Mode";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import { IoMdCheckmark } from "react-icons/io";
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
          {userEmail === "admin@test.com" && (
            <div className="nav-item">
              <Link to="/administration" className="nav-link">
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
            <span className="nav-title">{t("navbar.profile")}</span>
            {showDropdown && (
              <div
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={`fade-button ${fade ? "fade-out" : ""}`}
                  onClick={() => setShowLanguages((prev) => !prev)}
                >
                  <IoLanguage className="icon-item-profile" />
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
                      <FiSun className="icon-item-profile" />
                      {t("navbar.themeLight")}
                    </>
                  ) : (
                    <>
                      <FiMoon className="icon-item-profile" />
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
        <div className="nav-item">
          <Link to="/user-profile" className="nav-link">
            <CiEdit className="nav-icon" />
            <span className="nav-title">{t("navbar.editProfile")}</span>
          </Link>
        </div>
        <div className="nav-item" onClick={toggleTheme}>
          <div className="nav-link">
            {theme === "dark" ? (
              <>
                <FiSun className="nav-icon" />
                <span className="nav-title">{t("navbar.themeLight")}</span>
              </>
            ) : (
              <>
                <FiMoon className="nav-icon" />
                <span className="nav-title">{t("navbar.themeDark")}</span>
              </>
            )}
          </div>
        </div>
        <div
          className="nav-item"
          onClick={() => setShowLanguages((prev) => !prev)}
        >
          <div className="nav-link">
            <IoLanguage className="nav-icon" />
            <span className="nav-title">{t("navbar.language")}</span>
          </div>
        </div>
        {showLanguages && (
          <div style={{ paddingLeft: "20px" }}>
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="nav-item"
                onClick={() => {
                  changeLanguage(lang.code);
                  setShowLanguages(false);
                }}
              >
                <div className="nav-link">
                  <Flag code={lang.flag} style={{ width: "20px" }} />
                  <span className="nav-title">
                    {t(`navbar.language_${lang.code}`) || lang.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="nav-item" onClick={handleLogout}>
          <div className="nav-link">
            <FiLogOut className="nav-icon" />
            <span className="nav-title">{t("navbar.logout")}</span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </nav>
  );
}
