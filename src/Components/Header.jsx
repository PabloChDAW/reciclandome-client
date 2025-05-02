import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { AppContext } from "../Context/AppContext";


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {user, cart, totalItems, increment, decrement, removeItem } = useContext(AppContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);


    async function handleLogout(e) {
        e.preventDefault();

        const res = await fetch('/api/logout', {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate('/');
        }
    }

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
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/4 bg-[#D0FDD7] shadow-lg z-40 flex flex-col items-center text-center md:hidden">
                        <Link to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Inicio</Link>
                        <Link
                            to="/map"
                            className="block px-4 py-2 font-bold border-b-2 border-black pb-1 hover:text-yellow-950 animate-pulse"
                            style={{ animationDuration: '2.5s', animationIterationCount: 'infinite' }}
                        >
                            Mapa Interactivo
                        </Link>
                        <Link to="/about" className="block px-4 py-2 text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Quienes Somos</Link>
                        <Link to="/shop" className="block px-4 py-2 text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Tienda</Link>
                        <Link to="/contact" className="block px-4 py-2 text-[#131700] hover:text-yellow-950">Contacto</Link>

                        {/* Auth móvil */}
                        <div className="flex flex-col items-center gap-2 py-4 text-[#131700]">
                            {user ? (
                                <>
                                    <p className="text-sm">Hola, {user.name}</p>
                                    <button onClick={handleLogout} className="hover:underline text-sm">Cerrar sesión</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm hover:scale-110 transform duration-700">Login</Link>
                                    <Link to="/register" className="text-sm hover:scale-110 transform duration-700">Registrarse</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/*
                /* Carrito *
                <div className="relative flex items-center">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="nav-link relative">
                        🛒 Carrito ({cartItems.length})
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-lg z-50 p-4">
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-sm">Tu carrito está vacío.</p>
                            ) : (
                                <>
                                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="flex justify-between items-center text-sm">
                                                <span className="truncate w-24">{item.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => navigate("/cart")}
                                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
                                    >
                                        Ver carrito
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
*/}

                {/* Navegación desktop */}
                <nav className="hidden md:flex md:items-center md:gap-6 text-[#131700] lg:text-[20px] md:text-[17px]">
                    <Link to="/" className="hover:underline hover:font-bold">Inicio</Link>

                    <div className="relative group hidden md:block">
                        <div className="hover:underline hover:font-bold cursor-pointer">
                            Mapa Interactivo <span className="text-xs">&#9660;</span>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-gray-300 rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-40">
                            <Link to="/mapa/tipo-reciclaje" className="block px-4 py-2 text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Tipo de reciclaje</Link>
                            <Link to="/mapa/crear-punto" className="block px-4 py-2 text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Crear punto</Link>
                            <Link to="/mapa/ver-puntos" className="block px-4 py-2 text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Ver puntos limpios</Link>
                            <Link to="/mapa/eliminar-punto" className="block px-4 py-2 text-center text-[#131700] hover:text-[#afc543] hover:bg-gray-200 transition duration-700">Eliminar puntos</Link>
                        </div>
                    </div>

                    <Link to="/about" className="hover:underline hover:font-bold">Quienes Somos</Link>
                    <Link to="/blog" className="hover:underline hover:font-bold">Blog</Link>
                    <Link to="/shop" className="hover:underline hover:font-bold">Tienda</Link>
                    <Link to="/contact" className="hover:underline hover:font-bold">Contacto</Link>
                </nav>

                {/* Auth Desktop */}
                {/* Auth + Carrito Desktop */}
                <div className="hidden md:flex items-center gap-6 text-black relative">
                    {user ? (
                        <>
                            <p className="text-md">Hola, {user.name}</p>
                            <button onClick={handleLogout} className="text-sm hover:underline">Cerrar sesión</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-md hover:scale-110 transform duration-300">Hola, identifícate</Link>
                    )}

                    {/* Carrito */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="nav-link relative text-sm hover:underline"
                        >
                            🛒 Carrito ({totalItems})
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-lg z-50 p-4">
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-sm">Tu carrito está vacío.</p>
                                ) : (
                                    <>
                                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                                            {cart.map((item) => (
                                                <li key={item.id} className="flex justify-between items-center text-sm">
                                                    <span className="truncate w-24">{item.name}</span>
                                                    <div className="flex items-center space-x-1">
                                                        <button onClick={() => decrement(item.id)} className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">-</button>
                                                        <span className="font-medium p-1">{item.quantity}</span>
                                                        <button onClick={() => increment(item.id)} className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">+</button>
                                                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate("/cart");
                                            }}
                                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
                                        >
                                            Ver carrito
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
}
