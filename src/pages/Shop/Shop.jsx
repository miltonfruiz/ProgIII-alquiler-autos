import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Catalogo from "./Catalogo/Catalogo";
import Footer from "../../components/Footer/Footer";
import Filtros from "../Shop/Filtros/Filtros";
import styles from "./Shop.module.css";

function Shop() {
  return (
    <>
      <main className={styles.mainContainer}>
        <Navbar />
        <Filtros />
        <Catalogo />
      </main>
    </>
  );
}

export default Shop;
