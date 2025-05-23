import React, { useState } from "react";
import styles from "./Filtros.module.css";

const categorias = [
  { nombre: "Económico", cantidad: 4 },
  { nombre: "Estándar", cantidad: 1 },
  { nombre: "SUV", cantidad: 1 },
  { nombre: "Full Size", cantidad: 3 },
];

const marcas = [
  { nombre: "Volkswagen", cantidad: 2 },
  { nombre: "Fiat", cantidad: 1 },
  { nombre: "Chevrolet", cantidad: 1 },
  { nombre: "Toyota", cantidad: 3 },
  { nombre: "Peugeot", cantidad: 2 },
];

function Filtros({
  categoriasSeleccionadas,
  setCategoriasSeleccionadas,
  marcasSeleccionadas,
  setMarcasSeleccionadas,
}) {
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
                  checked={categoriasSeleccionadas.includes(categoria.nombre)} // GUARDA EL CHECK EN EL ARRAY DE CATEGORIAS
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
                  checked={marcasSeleccionadas.includes(marca.nombre)} // GUARDA EL CHECK EN EL ARRAY DE MARCAS
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
