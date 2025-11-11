import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";
import Carrousel from "../CarrouselHero/carrousel";

function Hero({ loggedIn }) {
  const navigate = useNavigate();

  const handleRentClick = () => {
    loggedIn ? navigate("/shop") : navigate("/login");
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.textContainer}>
          <h1>Tu viaje empieza con nosotros</h1>
          <p>
            Reservá tu auto en segundos y disfrutá del camino sin
            preocupaciones.
          </p>
          <div className={styles.btnContainer}>
            <button onClick={handleRentClick}>
              {loggedIn ? "Ver Autos" : "Comenzar"}
            </button>
          </div>
        </div>
      </div>
      <Carrousel />
    </section>
  );
}

export default Hero;
