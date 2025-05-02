import React, { useEffect, useState, useContext } from 'react';
import { getAllProducts } from '../api/products';
import Product from '../Components/Product';
import { AppContext } from '../Context/AppContext';


export default function Shop() {

    const [productos, setProductos] = useState([]);
    const { cart, setCart } = useContext(AppContext); // Usa el carrito global

    useEffect(() => {
        getAllProducts()
            .then(data => setProductos(data))
            .catch(err => console.error(err));
    }, []);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
          const existing = prevCart.find(item => item.id === product.id);
          if (existing) {
            return prevCart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevCart, { ...product, quantity: 1 }];
        });
      };

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 p-2">
                Shop
            </h2>

            <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productos.map((producto) => (
                    <Product 
                        key={producto.id} 
                        product={producto} 
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </>
    )
}