import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';




export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);


    // Simulamos productos en el carrito (después podrás conectar esto a tu contexto o redux)
    const { cartItems, increaseQuantity, decreaseQuantity } = useCart();



    return (
        <header className="sticky top-0 z-[100] shadow-md bg-[#EBF0EB]">
            <div className="mx-auto px-4 py-3 bg-opacity-40 z-99 flex items-center justify-between relative">
                {/* Logo */}
                <Link to="/" className="flex items-center hover:scale-110 transform duration-700 gap-2">
                    <img src="/Reciclandome_negro.png" alt="Logo" className="h-auto w-16" />
                </Link>

                {/* Botón hamburguesa - solo visible en móviles */}
                <div className="md:hidden z-50">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                    </button>
                </div>

                {/* Menú desplegable solo móvil */}
                {menuOpen && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/4 bg-[#D0FDD7] shadow-lg z-40 flex flex-col items-center text-center md:hidden ">
                        <Link to="/" className="block px-4 py-2 text-center text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Inicio</Link>
                        <Link
                            to="/map"
                            className="block px-4 py-2 text-center font-bold border-b-2 border-black pb-1 hover:text-yellow-950 animate-pulse"
                            style={{ animationDuration: '2.5s', animationIterationCount: 'infinite' }}
                        >
                            Mapa Interactivo
                        </Link>
                        <Link to="/about" className="block px-4 py-2 text-center text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Quienes Somos</Link>
                        <Link to="/favourites" className="block px-4 py-2 text-center text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Mis Favoritos</Link>
                        <Link to="/shop" className="block px-4 py-2 text-center text-[#131700]  hover:text-yellow-950 border-b-2 border-black pb-1">Tienda</Link>
                        <Link to="/contact" className="block px-4 py-2 text-center text-[#131700] hover:text-yellow-950 ">Contacto</Link>
                        {/* Login y carrito en móvil */}
                        <div className="flex items-center justify-center gap-6 py-4 text-[#131700]">
                            <FaUser className="text-2xl cursor-pointer" />
                            <div onClick={() => {
                                setIsCartOpen(true);
                                setMenuOpen(false); // Cerramos menú al abrir carrito
                            }} className="relative cursor-pointer">
                                <FaShoppingCart className="text-2xl" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#BBF7D0] text-green-900 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>
                )}

                {/* Navegación desktop */}
                <nav className="hidden md:flex md:flex-row md:items-center md:gap-6 text-[#131700] lg:text-[20px] md:text-[17px]">
                    <Link to="/" className="hover:underline hover:font-bold">Inicio</Link>

                    {/* Dropdown solo en desktop */}
                    <div className="relative group hidden md:block">
                        <div className="hover:underline hover:font-bold cursor-pointer">
                            Mapa Interactivo <span className="text-xs">&#9660;</span>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 lg:text-[17px] w-56 bg-white border border-gray-300 rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all-opacity duration-200 z-40">
                            <Link to="/mapa/tipo-reciclaje" className="block px-4 py-2  text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Tipo de reciclaje</Link>
                            <Link to="/mapa/crear-punto" className="block px-4 py-2 text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Crear punto</Link>
                            <Link to="/mapa/ver-puntos" className="block px-4 py-2 text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Ver puntos limpios</Link>
                            <Link to="/mapa/eliminar-punto" className="block px-4 py-2 text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Eliminar puntos</Link>
                        </div>
                    </div>

                    <Link to="/about" className="hover:underline hover:font-bold">Quienes Somos</Link>
                    <Link to="/favourites" className="hover:underline hover:font-bold">Mis Favoritos</Link>
                    <Link to="/blog" className="hover:underline hover:font-bold">Blog</Link>
                    <Link to="/shop" className="hover:underline hover:font-bold">Tienda</Link>
                    <Link to="/contact" className="hover:underline hover:font-bold">Contacto</Link>
                </nav>

                {/* Login y carrito */}
                <div className="hidden md:flex items-center gap-4 text-black relative">
                    <FaUser className="text-2xl cursor-pointer" />
                    <div onClick={() => setIsCartOpen(!isCartOpen)} className="relative cursor-pointer">
                        <FaShoppingCart className="text-2xl" />
                        {/* Número de productos */}
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#BBF7D0] text-green-900 font-bold text-xs rounded-full  w-5 h-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* Panel carrito */}
                <div
                    className={`fixed top-0 right-0 h-full w-full sm:w-3/5 md:w-1/2 lg:w-1/3 bg-white shadow-lg transition-transform duration-300 z-[99] ${isCartOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="bg-white p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#2d5e17]">🛒 Cesta</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 text-2xl">
                                &times;
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-600">Tu carrito está vacío.</p>
                        ) : (
                            <div className="flex-1 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                                        {/* Imagen del producto */}
                                        <img
                                            src={item.image} // Ahora cada item necesita su propiedad "image"
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />

                                        {/* Info producto */}
                                        <div className="flex-1">
                                            <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                                            <p className="text-gray-600 text-sm">{item.price}</p>
                                            
                                            {/* Contador */}
                                            <div className="flex items-center mt-2 space-x-2">
                                                <button
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                >
                                                    -
                                                </button>
                                                <span className="font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                        {/* Botón ir a checkout */}
                        <div className="flex flex-col-2 space-x-2 items-center justify-center px-4 text-[15px]">
                            <div className="mt-6 w-full">
                                <button className="w-full py-2 text-[10px] sm:text-[12px] md:text-[12px] lg:text-[14px] bg-[#166534] hover:bg-white text-white hover:text-[#166534] hover:border border-[#166534] rounded-full transition duration-700">
                                    GUARDAR CARRITO
                                </button>
                            </div>
                            <div className="mt-6 w-full">
                                <button className="w-full py-2 text-[10px] sm:text-[12px] md:text-[12px] lg:text-[14px] bg-[#166534] hover:bg-white text-white hover:text-[#166534] hover:border border-[#166534] rounded-full transition duration-700">
                                    TRAMITAR PEDIDO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
