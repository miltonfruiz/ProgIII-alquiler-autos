import React from "react";

function MyProfile() {
  return (
    <div>
      <div>
        <img
          src="images/profile.png"
          alt="foto perfil"
          className="img-profile"
        />
        <div>
          <h2>Maria San Juan</h2>
          <p>Fecha Nacimiento: 20/03/1992</p>
          <p>DNI: 39.484.200</p>
          <p>Nº licencia: 39489200</p>
          <a href="#">Editar perfil</a>
        </div>
      </div>
      <button>Cerrar sesión</button>
    </div>
  );
}

export default MyProfile;
