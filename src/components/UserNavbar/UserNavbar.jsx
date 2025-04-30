import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div>
        <img src="" alt="Logo" />
      </div>
      <div>
        <input type="text" placeholder="Ingrese nombre o modelo de auto..." />
        <button>Boton de Filtro</button>
      </div>

      <div>
        <Link to="/autos">
          <img src="" alt="autos" />
        </Link>
        <Link to="/perfil">
          <img src="" alt="Perfil" />
        </Link>
      </div>
    </nav>
  );
}
