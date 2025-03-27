import { createContext } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  return (
    /* Al envolver la aplicación en un contexto podemos pasar valores como propiedades. */
    <AppContext.Provider value={{ name: "Pablo" }}>
      {children}
    </AppContext.Provider>
  );
}
