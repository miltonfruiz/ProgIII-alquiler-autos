import UserNavbar from "../components/UserNavbar/UserNavbar";
import MyProfile from "../components/MyProfile/MyProfile";
import MyReservations from "../components/MyReservations/MyReservations";

const UserProfile = () => {
  return (
    <div>
      <UserNavbar />
      <MyProfile />
      <MyReservations />
      <p>Componente Reservas pasadas</p>
    </div>
  );
};

export default UserProfile;
