import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  //TODO Aunque con los cambios ya no se obtiene recurrentemente el 401 unauthorized, sería interesante mostrar el carrito
  //TODO Solo si el usuario está ya logueado, pero de todas formas dejo este arreglo rápido que gestiona con excepciones.
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
    if (!token) {
      setUser(null); // Limpiar usuario por si acaso
      return;
    }
    /* Petición de autorización */
    try{
      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //Si hay error 401
      if (res.status === 401) {
        setToken(null); // Limpiar token inválido
        localStorage.removeItem("token"); // Limpiar almacenamiento
        setUser(null); // Limpiar usuario
        return;
      }
      
      //En caso que va bien
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    // Limpiar todo si hay error de red
    } catch (error) {
      console.error("Error fetching user:", error);

      setToken(null);
      localStorage.removeItem("token");
      setUser(null);
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
