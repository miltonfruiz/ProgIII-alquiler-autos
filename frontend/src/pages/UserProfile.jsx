import UserNavbar from "../components/UserNavbar/UserNavbar";
import MyProfile from "../components/MyProfile/MyProfile";
import MyReservations from "../components/MyReservations/MyReservations";
import MyPastReservations from "../components/MyPastReservations/MyPastReservations";
import LandingFooter from "../components/LandingFooter/LandingFooter";
import Footer from "../components/Footer/Footer";
import "./UserProfile.css"; // Crearemos este archivo CSS

const UserProfile = () => {
  return (
    <>
      <UserNavbar />
      <div className="user-profile-layout">
        <div className="profile-section">
          <MyProfile />
        </div>
        <div className="reservations-section">
          <MyReservations />
          <MyPastReservations />
        </div>
      </div>
      <LandingFooter />
    </>
  );
};

export default UserProfile;
