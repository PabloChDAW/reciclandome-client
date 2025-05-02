// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';

// 1. Crear contexto
const CartContext = createContext();

// 2. Proveedor único
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Camiseta Don't Be Trashy",
            price: "16.95€",
            image: "/Camiseta_Dont_Be_Trashy.png",
            quantity: 1
        },
        {
            id: 2,
            name: "Camiseta niño reciclando",
            price: "14.95€",
            image: "/Camiseta_Niño_Reciclando.png",
            quantity: 1
        }
    ]);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const increaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}

// 3. Hook para usarlo
export function useCart() {
    return useContext(CartContext);
}
