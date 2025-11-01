import React, { useState, useEffect } from "react";
import styles from "./SearchNavbar.module.css";
import { CiSearch } from "react-icons/ci";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import ResultsSearch from "./ResultsSearch/ResultsSearch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function SearchNavbar() {
  const { t } = useTranslation();
  const [textSearch, setTextSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const MIN_SEARCH_LENGTH = 3;

  const handleCloseSearch = () => {
    setTextSearch("");
    setResults([]);
    setShowResults(false);
    setLoading(false);
    setError(null);
    document.body.classList.remove("bloquear-scroll");
  };

  const handleInputChange = (e) => {
    setTextSearch(e.target.value);
    setError(null);
    if (e.target.value.trim() === "") {
      setResults([]);
      setShowResults(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (textSearch.trim() === "" || textSearch.length < MIN_SEARCH_LENGTH) {
      setLoading(false);
      setShowResults(false);
      document.body.classList.remove("bloquear-scroll");
      return;
    }

    document.body.classList.add("bloquear-scroll");
    setLoading(true);
    setError(null);

    const getData = setTimeout(() => {
      // Obtener todos los autos sin paginación para búsqueda local
      fetch(`http://localhost:3000/cars?limit=1000`)
        .then((res) => {
          if (!res.ok) throw new Error("Error en la búsqueda");
          return res.json();
        })
        .then((data) => {
          // Extraer el array de autos de la respuesta paginada
          const allCars = data.autos || [];

          // Filtrar en el frontend
          const filtered = allCars.filter(
            (car) =>
              car.name.toLowerCase().includes(textSearch.toLowerCase()) ||
              car.category?.toLowerCase().includes(textSearch.toLowerCase()) ||
              car.brand?.toLowerCase().includes(textSearch.toLowerCase())
          );

          setResults(filtered);
          setLoading(false);
          setShowResults(true);
        })
        .catch((err) => {
          console.error("Error al buscar autos:", err);
          setError("Error al buscar autos");
          setLoading(false);
        });
    }, 800);

    return () => clearTimeout(getData);
  }, [textSearch]);

  return (
    <div className={styles.searchWrapper}>
      <CiSearch size={18} className={styles.searchIcon} />
      <input
        aria-label="Search cars"
        value={textSearch}
        onChange={handleInputChange}
        type="text"
        placeholder={t("navbar.searchPlaceholder")}
        className={styles.navBarSearch}
      />
      {textSearch && (
        <FontAwesomeIcon
          icon={faX}
          className={styles.closeIcon}
          onClick={handleCloseSearch}
        />
      )}

      {textSearch.length > 0 && textSearch.length < MIN_SEARCH_LENGTH && (
        <div className={styles.minCharsMessage}>
          Escribe al menos {MIN_SEARCH_LENGTH} caracteres
        </div>
      )}

      {/* Loading */}
      {loading && <div className={styles.loading}>Buscando...</div>}

      {/* Error */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Resultados */}
      {showResults && !loading && !error && <ResultsSearch cars={results} />}
    </div>
  );
}

export default SearchNavbar;
