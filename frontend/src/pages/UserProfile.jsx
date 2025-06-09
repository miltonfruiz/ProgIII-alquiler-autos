import UserNavbar from "../components/UserNavbar/UserNavbar";
import MyProfile from "../components/MyProfile/MyProfile";
import MyReservations from "../components/MyReservations/MyReservations";
import MyPastReservations from "../components/MyPastReservations/MyPastReservations";
import LandingFooter from "../components/LandingFooter/LandingFooter";

const UserProfile = () => {
  return (
    <div>
      <UserNavbar />
      <MyProfile />
      <MyReservations />
      <MyPastReservations />
      <LandingFooter />
    </div>
  );
};

export default UserProfile;
