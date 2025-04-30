import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-wrapper">
          <img
            src="/public/images/logo.png"
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
          <div className="cars-container">
            <Link to="/cars">
              <img src="" alt="Autos" className="navbar-icon" />
            </Link>
          </div>
          <div className="user-container">
            <Link to="/user-profile">
              <img src="" alt="Perfil" className="navbar-icon" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
