import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-wrapper">
          <img
            src=""
            alt="Logo"
            className="navbar-logo"
            onClick={() => navigate("/testhome")}
          />
        </div>
      </div>
      <div className="navbar-center">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Ingrese nombre o modelo de auto..."
            className="navbar-search"
          />
          <button className="navbar-filter">
            <img src="" alt="Filtro" />
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
