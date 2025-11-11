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
  const [isSearchActive, setIsSearchActive] = useState(false);

  const MIN_SEARCH_LENGTH = 3;

  const handleCloseSearch = () => {
    setTextSearch("");
    setResults([]);
    setShowResults(false);
    setLoading(false);
    setError(null);
    setIsSearchActive(false);
    document.body.classList.remove("bloquear-scroll");
    // Remover overlay si existe
    const existingOverlay = document.getElementById("search-overlay");
    if (existingOverlay) {
      existingOverlay.remove();
    }
  };

  const handleInputFocus = () => {
    setIsSearchActive(true);
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

  // Función para crear el overlay
  const createOverlay = () => {
    const overlay = document.createElement("div");
    overlay.id = "search-overlay";
    overlay.className = "overlay-search";
    overlay.onclick = handleCloseSearch;
    document.body.appendChild(overlay);
  };

  useEffect(() => {
    if (textSearch.trim() === "" || textSearch.length < MIN_SEARCH_LENGTH) {
      setLoading(false);
      setShowResults(false);
      return;
    }

    // Activar búsqueda y overlay
    if (!isSearchActive) {
      setIsSearchActive(true);
    }

    setLoading(true);
    setError(null);

    const getData = setTimeout(() => {
      fetch(`http://localhost:3000/cars?limit=1000`)
        .then((res) => {
          if (!res.ok) throw new Error("Error en la búsqueda");
          return res.json();
        })
        .then((data) => {
          const allCars = data.autos || [];
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

  // Efecto para manejar el overlay y bloqueo de scroll
  useEffect(() => {
    if (isSearchActive && textSearch.length >= MIN_SEARCH_LENGTH) {
      document.body.classList.add("bloquear-scroll");
      createOverlay();
    } else {
      document.body.classList.remove("bloquear-scroll");
      const existingOverlay = document.getElementById("search-overlay");
      if (existingOverlay) {
        existingOverlay.remove();
      }
    }

    return () => {
      // Cleanup al desmontar el componente
      document.body.classList.remove("bloquear-scroll");
      const existingOverlay = document.getElementById("search-overlay");
      if (existingOverlay) {
        existingOverlay.remove();
      }
    };
  }, [isSearchActive, textSearch]);

  return (
    <div className={styles.searchWrapper}>
      <CiSearch size={18} className={styles.searchIcon} />
      <input
        aria-label="Search cars"
        value={textSearch}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
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
      {showResults && !loading && !error && (
        <ResultsSearch cars={results} onClose={handleCloseSearch} />
      )}
    </div>
  );
}

export default SearchNavbar;
