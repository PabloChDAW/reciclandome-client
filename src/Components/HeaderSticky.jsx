import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';




export default function HeaderSticky() {
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
                </div>
            </div>
        </header>
    );
}
