import { createContext, useContext, useEffect, useState } from "react";

const Theme = createContext(); // crea un contexto

export const Mode = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("theme"); // busca en el local storage el valor de la clave theme mediante el getItem()
    return localTheme || "light";
  }); // esto es para que cuando se cargue la pagina se inicialize con el tema que habiamos elegido en el pasado. por defecto light
  useEffect(() => {
    document.body.className = theme; // le añade al body la classname con el valor que posee el useEffect "theme"
    localStorage.setItem("theme", theme); // guarda el valor actual de theme en el localstorage en la clave theme con setItem()
  }, [theme]); // el useEffect se ejecuta cuando cambia theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light")); // cambia el valor de theme si es light a dark y viceversa
  };
  return (
    <Theme.Provider value={{ theme, toggleTheme }}>{children}</Theme.Provider> // pasamos a todos los elementos hijos de la etiqueta Theme el valor de theme y la funcion toggleTheme
  );
};

export const useTheme = () => useContext(Theme); // guardamos el contexto theme en una variable useTheme para que sea usada de esa manera en los componentes que deseemos usarla
