import { useState } from "react";
import styles from "./carrousel.module.css";
import CarBrands from "../mockUpsBrandCars";

const CarBrandsCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={styles.carouselContainer}>
      <div
        className={`${styles.carouselTrack} ${isPaused ? styles.paused : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Primera serie de marcas */}
        {CarBrands.map((brand, index) => (
          <div
            key={`first-${index}`}
            className={styles.brandItem}
            title={brand.name}
          >
            <img
              src={brand.logo}
              alt={`${brand.name} Logo`}
              className={styles.brandLogo}
              onError={(e) => {
                // Fallback si la imagen no carga
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className={styles.brandName}>{brand.name}</div>
          </div>
        ))}

        {/* Segunda serie de marcas (duplicada para efecto continuo) */}
        {CarBrands.map((brand, index) => (
          <div
            key={`second-${index}`}
            className={styles.brandItem}
            title={brand.name}
          >
            <img
              src={brand.logo}
              alt={`${brand.name} Logo`}
              className={styles.brandLogo}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className={styles.brandName}>{brand.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarBrandsCarousel;
