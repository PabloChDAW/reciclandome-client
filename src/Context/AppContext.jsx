import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

    // Leer carrito desde localStorage al iniciar
    const [cart, setCart] = useState(() => {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    });

    // Guardar carrito en localStorage cada vez que cambie
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

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
    <AppContext.Provider value={{ token, setToken, user, setUser, cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
}
