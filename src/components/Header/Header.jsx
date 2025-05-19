import React from "react";
import { VscSettings } from "react-icons/vsc"; // settings
import { BiCar } from "react-icons/bi"; // auto
import { LuUserRound } from "react-icons/lu"; // persona
import { IoSearchOutline } from "react-icons/io5"; // buscador

const Header = () => {
  return (
    <div>
      <nav className="navRegister">
        <img className="autoHeader" src="public\images\autoNav.png" alt="" />
        <div className="divBusqueda">
          <button className="botonBuscar">
            <IoSearchOutline className="imagenBuscar"></IoSearchOutline>
          </button>
          <input
            className="barraBusqueda"
            type="search"
            placeholder="Buscar algo aqui"
          />
          <button className="botonSettings">
            <VscSettings className="settings"></VscSettings>
          </button>
        </div>

        <BiCar title="Autos" className="imagenAuto"></BiCar>
        <LuUserRound title="Usuarios" className="imagenPersona"></LuUserRound>
      </nav>
    </div>
  );
};

export default Header;
