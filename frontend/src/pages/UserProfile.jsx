import UserNavbar from "../components/UserNavbar/UserNavbar";
import MyProfile from "../components/MyProfile/MyProfile";
import MyReservations from "../components/MyReservations/MyReservations";
import MyPastReservations from "../components/MyPastReservations/MyPastReservations";

const UserProfile = () => {
  return (
    <div>
      <UserNavbar />
      <MyProfile />
      <MyReservations />
      <MyPastReservations />
    </div>
  );
};

export default UserProfile;
