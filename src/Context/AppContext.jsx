import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Cargar usuario de localStorage + imagen de perfil si existe
  const storedUser = localStorage.getItem("user");
  let parsedUser = storedUser ? JSON.parse(storedUser) : null;

  if (parsedUser?.id) {
    const savedImage = localStorage.getItem(`profileImage_${parsedUser.id}`);
    if (savedImage) {
      parsedUser.imageUrl = savedImage;
    }
  }

  const [user, setUser] = useState(parsedUser);

  // Leer carrito desde localStorage al iniciar
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Guardar usuario en localStorage cada vez que cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  async function getUser() {
    if (!token) return;
    const res = await fetch("https://reciclandome-api-main-laravelcloud-4b3jba.laravel.cloud/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setUser(prev => {
        const savedImage = localStorage.getItem(`profileImage_${data.id}`);
        return savedImage ? { ...data, imageUrl: savedImage } : data;
      });
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setUser(null);
    }
  }, [token]);

  // Funciones de carrito
  function increment(id) {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrement(id) {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        cart,
        setCart,
        increment,
        decrement,
        clearCart,
        removeItem,
        totalItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
