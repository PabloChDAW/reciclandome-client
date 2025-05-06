import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import SliderShop from '../Components/SliderShop';
import { Link } from 'react-router-dom';

const sliderImages = [
    '/fondo_tienda.jpg',
    '/fondo_tienda2.jpg',
    '/fondo_tienda3.jpg'
];

const products = [
    {
        id: 1,
        name: "Camiseta Dont be Trashy",
        price: 16.95,
        image: "/Camiseta_Dont_Be_Trashy.png",
    },
    {
        id: 2,
        name: "Camiseta Niño Reciclando",
        price: 14.95,
        image: "/Camiseta_Niño_Reciclando.png",
    },
    {
        id: 3,
        name: "Camiseta Eco Guerrera",
        price: 15.95,
        image: "/Camiseta_Dont_Be_Trashy.png",
    },
    {
        id: 4,
        name: "Camiseta Planeta Feliz",
        price: 13.95,
        image: "/Camiseta_Niño_Reciclando.png",
    }
];

const ShopPage = () => {
    const { cart, setCart } = useContext(AppContext);
    const [showToast, setShowToast] = useState(false); 

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

        
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <>
            <SliderShop images={sliderImages} interval={4000} />

            <div className="flex flex-col justify-center items-center py-20 max-w-7xl mx-auto">
                <div className="gap-5 max-w-7xl w-full items-center">
                    <div className="flex flex-col gap-5 max-w-7xl w-full items-center">
                        <div className="flex flex-col items-center lg:col-span-2">
                            <h1 className="text-4xl font-bold text-center mb-2">
                                Camisetas 100% recicladas ♻️
                            </h1>
                            <p className="text-center text-lg text-gray-600 mb-10">
                                ¡Únete a nuestra causa y luce con conciencia ambiental! 🌿
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 place-items-center">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="border rounded-xl p-4 shadow-sm hover:shadow-md hover:shadow-[#D0FDD7] transition w-full duration-500 hover:scale-105"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-40 object-contain mb-4"
                                        />
                                        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                                        <p className="text-black font-bold mb-2">EUR {product.price}€</p>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full py-2 mt-10 text-sm bg-[#166534] hover:bg-white text-white hover:text-[#166534] hover:border border-[#166534] rounded-full transition duration-700 flex items-center justify-center gap-2"
                                        >
                                            🛒 AÑADIR A LA CESTA
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* ✅ Toast fuera del .map */}
                            {showToast && (
                                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 transition-opacity duration-500">
                                    <Link to="/cart" >✅ Producto añadido al carrito </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopPage;
