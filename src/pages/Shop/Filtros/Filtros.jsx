import React, { useState } from "react";
import styles from "./Filtros.module.css";

const categorias = [
  { nombre: "Económico", cantidad: 10 },
  { nombre: "Estándar", cantidad: 12 },
  { nombre: "SUV", cantidad: 16 },
  { nombre: "Full Size", cantidad: 20 },
];

const marcas = [
  { nombre: "Volkswagen", cantidad: 10 },
  { nombre: "Fiat", cantidad: 12 },
  { nombre: "Chevrolet", cantidad: 16 },
  { nombre: "Toyota", cantidad: 20 },
  { nombre: "Peugot", cantidad: 20 },
];

function Filtros() {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

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
    <aside className={styles.filtrosConteiner}>
      <h3 className={styles.titleSection}>Filtros</h3>

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
