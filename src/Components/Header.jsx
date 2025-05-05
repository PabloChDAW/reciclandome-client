import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiOutlineUser, HiOutlineUserAdd } from "react-icons/hi";
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

                {/* Menú desplegable móvil con animación */}
                <>
                    {/* Backdrop con transición de opacidad */}
                    <div
                        className={`
            fixed inset-0 bg-black z-40 transition-opacity duration-700
            ${menuOpen ? 'bg-opacity-40' : 'bg-opacity-0 pointer-events-none'}
        `}
                        onClick={() => setMenuOpen(false)}
                    ></div>

                    {/* Menú lateral con transición de deslizamiento */}
                    <div
                        className={`
            fixed top-0 right-0 h-full w-3/4 sm:w-2/5 bg-[#D0FDD7] z-50 shadow-lg transform transition-transform duration-700 ease-in-out
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
                    >
                        <div className="flex justify-end p-4">
                            <button onClick={() => setMenuOpen(false)}>
                                <HiX className="text-2xl text-[#131700]" />
                            </button>
                        </div>

                        <nav className="flex flex-col items-start gap-4 px-6 text-[#131700]">
                            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-900">🏠 Inicio</Link>
                            <Link to="/map" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 font-bold animate-pulse hover:text-green-900">🗺️ Mapa Interactivo</Link>
                            <Link to="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-900">👥 Quiénes Somos</Link>
                            <Link to="/shop" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-900">🛍️ Tienda</Link>
                            <Link to="/contact" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-900">📞 Contacto</Link>

                            <div className="pt-4 border-t w-full">
                                {user ? (
                                    <>
                                        <p className="text-sm">Hola, {user.name}</p>
                                        <button onClick={handleLogout} className="text-sm hover:underline">Cerrar sesión</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:scale-105 transition-transform">👤 Login</Link>
                                        <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:scale-105 transition-transform">📝 Registro</Link>
                                    </>
                                )}
                            </div>

                            <div className="pt-4 w-full">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        navigate("/cart");
                                    }}
                                    className="w-full bg-green-700 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-green-800 transition-colors duration-300"
                                >
                                    🛒 Ver carrito ({totalItems})
                                </button>
                            </div>
                        </nav>
                    </div>
                </>




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

                {/* Auth + Carrito Desktop */}
                <div className="hidden md:flex items-center gap-6 text-[#131700] relative">
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
                            className="flex nav-link relative text-sm hover:underline"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#131700"
                            >
                                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                            </svg>
                            ({totalItems})
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
                                            className="mt-4 w-full bg-[#166534] text-white py-3 rounded-full hover:bg-[#14532d] text-sm"
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
