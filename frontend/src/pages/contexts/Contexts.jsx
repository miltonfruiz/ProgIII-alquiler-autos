import { createContext, useState, useContext } from "react";

export const dataContext = createContext(); // esto crea el componente <dataContext>

export function Contexts({ children }) {
  const [estadoIds, setEstadoGlobal] = useState({});

  const value = { estadoIds, setEstadoGlobal };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export function useDataContext() {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a dataContextProivder");
  }
  return context;
}
