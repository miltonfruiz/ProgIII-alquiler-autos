import UserNavbar from "../components/UserNavbar/UserNavbar";
import MyProfile from "../components/MyProfile/MyProfile";

const UserProfile = () => {
  return (
    <div>
      <UserNavbar />
      <MyProfile />
      <p>Componente Mis Reservas</p>
      <p>Componente Reservas pasadas</p>
    </div>
  );
};

export default UserProfile;
