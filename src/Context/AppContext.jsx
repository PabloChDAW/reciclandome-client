import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  async function getUser() {
    /* Petición de autorización */
    const res = await fetch("/api/user", {
      headers: {
        Authorization: ``,
      },
    });

    const data = await res.json();

    console.log(data);
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    /* Al envolver la aplicación en un contexto podemos pasar valores como propiedades. */
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}
