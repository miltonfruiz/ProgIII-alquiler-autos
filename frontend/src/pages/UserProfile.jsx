import UserNavbar from "../components/UserNavbar/UserNavbar";
import MyProfile from "../components/MyProfile/MyProfile";
import MyReservations from "../components/MyReservations/MyReservations";
import MyPastReservations from "../components/MyPastReservations/MyPastReservations";
import LandingFooter from "../components/LandingFooter/LandingFooter";
import Footer from "../components/Footer/Footer";

const UserProfile = () => {
  return (
    <>
      <UserNavbar />
      <MyProfile />
      <MyReservations />
      <MyPastReservations />
      <LandingFooter /> {/* CAMBIAR TODOS LOS LANDING FOOTER A --FOOTER-- */}
    </>
  );
};

export default UserProfile;
