import CarsAdmin from "../components/CarsAdmin/CarsAdmin";
import LandingFooter from "../components/LandingFooter/LandingFooter";
import UsersAdmin from "../components/UserAdmin/UsersAdmin";
import UserNavbar from "../components/UserNavbar/UserNavbar";

const Administration = () => {
  return (
    <div>
      <UserNavbar />
      <CarsAdmin />
      <UsersAdmin />
      <LandingFooter />
    </div>
  );
};

export default Administration;
