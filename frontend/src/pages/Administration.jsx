import CarsAdmin from "../components/CarsAdmin/CarsAdmin";
import LandingFooter from "../components/LandingFooter/LandingFooter";
import ReservationsAdmin from "../components/ReservationsAdmin/ReservationsAdmin";
import UsersAdmin from "../components/UserAdmin/UsersAdmin";
import UserNavbar from "../components/UserNavbar/UserNavbar";

const Administration = () => {
  return (
    <div>
      <UserNavbar />
      <CarsAdmin />
      <UsersAdmin />
      <ReservationsAdmin />
      <LandingFooter />
    </div>
  );
};

export default Administration;
