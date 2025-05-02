// src/pages/ShopPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaTrashAlt, FaFileAlt, FaGlassMartiniAlt, FaLeaf } from 'react-icons/fa';
import SliderShop from '../Components/SliderShop';

const sliderImages = [
    '/fondo_tienda.jpg',
    '/fondo_tienda2.jpg',
    '/fondo_tienda3.jpg'
];
const products = [
    {
        name: "Camiseta Dont be Trashy",
        price: "16.95",
        image: "/Camiseta_Dont_Be_Trashy.png",
    },
    {
        name: "Camiseta Niño Reciclando",
        price: "14.95",
        image: "/Camiseta_Niño_Reciclando.png",
    },
    {
        name: "Camiseta Dont be Trashy",
        price: "16.95",
        image: "/Camiseta_Dont_Be_Trashy.png",
    },
    {
        name: "Camiseta Niño Reciclando",
        price: "14.95",
        image: "/Camiseta_Niño_Reciclando.png",
    },
    {
        name: "Camiseta Dont be Trashy",
        price: "16.95",
        image: "/Camiseta_Dont_Be_Trashy.png",
    },
    {
        name: "Camiseta Niño Reciclando",
        price: "14.95",
        image: "/Camiseta_Niño_Reciclando.png",
    },
    {
        name: "Camiseta Dont be Trashy",
        price: "16.95",
        image: "/Camiseta_Dont_Be_Trashy.png",
    },
    {
        name: "Camiseta Niño Reciclando",
        price: "14.95",
        image: "/Camiseta_Niño_Reciclando.png",
    },
];

const ShopPage = () => {
    return (
        <>
            <SliderShop images={sliderImages} interval={4000} />

            <div className="flex flex-col justify-center items-center py-20 max-w-7xl mx-auto">
                <div className="gap-5 max-w-7xl w-full items-center">
                    <div className="flex flex-col gap-5 max-w-7xl w-full items-center">

                        <div className="flex flex-col items-center lg:col-span-2">
                            <h1 className="text-4xl font-bold text-center mb-2">
                                Camisetas 100% recicladas
                            </h1>
                            <p className="text-center text-lg text-gray-600 mb-10">
                                ¡Únete a nuestra causa!
                            </p>

                            {/* Productos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 place-items-center">
                                {products.map((product, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-xl p-4 shadow-sm hover:shadow-md hover:shadow-[#D0FDD7] transition w-full"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-40 object-contain mb-4 hover:scale-110 transition duration-700"
                                        />
                                        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                                        <p className="text-black font-bold mb-2">EUR {product.price}€</p>
                                        <button className="w-full py-2 mt-10 text-[10px] sm:text-[12px] md:text-[12px] lg:text-[14px] bg-[#166534] hover:bg-white text-white hover:text-[#166534] hover:border border-[#166534] rounded-full transition duration-700 flex items-center justify-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="20px"
                                                viewBox="0 -960 960 960"
                                                width="20px"
                                                fill="currentColor"
                                                className="transition duration-700"
                                            >
                                                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                                            </svg>
                                            AÑADIR A LA CESTA
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default ShopPage;
