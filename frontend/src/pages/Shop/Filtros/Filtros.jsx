import styles from "./Filtros.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

function Filtros({
  categorias,
  marcas,
  categoriasSeleccionadas,
  setCategoriasSeleccionadas,
  marcasSeleccionadas,
  setMarcasSeleccionadas,
  setFiltrosVisible,
  filtrosVisible,
}) {
  const filtrosRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtrosRef.current && !filtrosRef.current.contains(event.target)) {
        setFiltrosVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFiltrosVisible]);

  useEffect(() => {
    if (filtrosVisible) {
      // Guardar el estado actual del scroll y bloquear el body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Restaurar el scroll normal
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }

    // Cleanup: restaurar el scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [filtrosVisible]);

  const handleCategoriaChange = (nombre) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(nombre)
        ? prev.filter((cat) => cat !== nombre)
        : [...prev, nombre]
    );
  };

  const handleMarcaChange = (nombre) => {
    setMarcasSeleccionadas((prev) =>
      prev.includes(nombre)
        ? prev.filter((marca) => marca !== nombre)
        : [...prev, nombre]
    );
  };

  return (
    <aside
      ref={filtrosRef}
      className={`${styles.filtrosConteiner} ${styles.show}`}
    >
      <div className={styles.headerFiltros}>
        <h3 className={styles.titleSection}>Filtros</h3>
        <button
          className={styles.closeBtn}
          onClick={() => setFiltrosVisible(false)}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
      </div>

      <div className={styles.filtrosSection}>
        {/* Categorías */}
        <div className={styles.categoriasFilter}>
          <h4 className={styles.typeTitle}>CATEGORÍA</h4>
          <div className={styles.checkBoxSection}>
            {categorias.map((categoria) => (
              <label key={categoria.nombre}>
                <input
                  type="checkbox"
                  value={categoria.nombre}
                  checked={categoriasSeleccionadas.includes(categoria.nombre)}
                  onChange={() => handleCategoriaChange(categoria.nombre)}
                />
                {categoria.nombre} ({categoria.cantidad})
              </label>
            ))}
          </div>
        </div>

        {/* Marcas */}
        <div className={styles.marcaFilter}>
          <h4 className={styles.typeTitle}>MARCA</h4>
          <div className={styles.checkBoxSection}>
            {marcas.map((marca) => (
              <label key={marca.nombre}>
                <input
                  type="checkbox"
                  value={marca.nombre}
                  checked={marcasSeleccionadas.includes(marca.nombre)}
                  onChange={() => handleMarcaChange(marca.nombre)}
                />
                {marca.nombre} ({marca.cantidad})
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Filtros;
