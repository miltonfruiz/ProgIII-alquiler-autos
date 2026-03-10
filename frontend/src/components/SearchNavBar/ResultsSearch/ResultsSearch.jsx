import styles from "./Results.module.css";
import { useState } from "react";
import ReservaPage from "../../../pages/Reserva/ReservaPage";
import { useNavigate } from "react-router-dom";

function ResultsSearch({ cars, maxResults = 5, onClose }) {
  const displayedCars = cars.slice(0, maxResults);
  const hasMore = cars.length > maxResults;
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleReservarClick = (car) => {
    onClose?.(); // ✅ cerrar el dropdown de búsqueda si existe
    navigate("/reserva", { state: { auto: car } }); // ✅ navegar con el auto
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <>
      {displayedCars.length > 0 ? (
        <div className={styles.resultsContainer}>
          {displayedCars.map((car) => (
            <div key={car.id} className={styles.carCard}>
              <img
                src={`http://localhost:3000${car.image}`}
                alt={car.name}
                className={styles.carImage}
                onError={(e) => {
                  e.target.src = "/placeholder-car.png"; // Imagen por defecto si falla
                }}
              />
              <div className={styles.carInfo}>
                <h4 className={styles.carName}>{car.name}</h4>
                <p className={styles.carCategory}>{car.category}</p>
                <p className={styles.carPrice}>
                  ${car.price ? car.price.toLocaleString() : "N/A"} Ars
                </p>
                <button
                  className={styles.btnReservar}
                  onClick={() => handleReservarClick(car)}
                >
                  Ir a reservar
                </button>
              </div>
            </div>
          ))}
          {hasMore && (
            <div className={styles.showMore}>
              <a href="#">Ver todos los resultados </a>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>No se encontraron resultados</p>
        </div>
      )}
      {/* {isModalOpen && selectedCar && (
        <ReservaPage car={selectedCar} onClose={handleCloseModal} />
      )} */}
    </>
  );
}

export default ResultsSearch;
