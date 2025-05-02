import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);


  async function getUser() {
    /* Petición de autorización */
    const res = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    /* Al envolver la aplicación en un contexto podemos pasar valores como propiedades. */
    <AppContext.Provider value={{ token, setToken, user, setUser, cart, setCart}}>
      {children}
    </AppContext.Provider>
  );
}
