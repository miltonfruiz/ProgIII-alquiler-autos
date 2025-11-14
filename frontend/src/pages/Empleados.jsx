import LandingFooter from "../components/LandingFooter/LandingFooter";
import ReservationsAdmin from "../components/ReservationsAdmin/ReservationsAdmin";
import UsersAdmin from "../components/UserAdmin/UsersAdmin";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import styles from "./Empleados.module.css";

const Empleados = () => {
  return (
    <div className={styles.Empleados}>
      <UserNavbar />
      <ReservationsAdmin />
      <UsersAdmin />
      <LandingFooter />
    </div>
  );
};

export default Empleados;
