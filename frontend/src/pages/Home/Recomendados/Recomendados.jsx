import React, { useState, useRef, use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Recomendados.module.css";
import CarCard from "../../../components/CarCard/CarCard";
import Modal from "../../../components/Modal/Modal";

function Recomendados({ autos, loggedIn }) {
  const navigate = useNavigate();
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const containerRef = useRef(null);

  const handleRent = (car) => {
    if (loggedIn) {
      setAutoSeleccionado(car);
    } else {
      navigate("/login");
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    //Traer autos recomendados al montar el componente
    fetch("http://localhost:3000/cars")
      .then((response) => response.json())
      .then((data) => {
        console.log("Autos recomendados:", data);
      })
      .catch((error) => {
        console.error("Error al obtener autos recomendados:", error);
      });
  }, []);

  return (
    <section className={styles.recomendadosSection}>
      <div className={styles.headerContainer}>
        <div className={styles.titleConteiner}>
          <h3>Recomendados</h3>
          <p>Los más usados entre nuestros clientes</p>
        </div>
        <div className={styles.navigationButtons}>
          <button onClick={scrollLeft} className={styles.navButton}>
            &lt;
          </button>
          <button onClick={scrollRight} className={styles.navButton}>
            &gt;
          </button>
        </div>
      </div>

      <div className={styles.recomendadosConteiner} ref={containerRef}>
        {autos.map((car) => (
          <CarCard key={car.id} {...car} onRent={() => handleRent(car)} />
        ))}
      </div>

      {autoSeleccionado && (
        <Modal
          auto={autoSeleccionado}
          onClose={() => setAutoSeleccionado(null)}
        />
      )}
    </section>
  );
}

export default Recomendados;
