import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { AppContext } from "../Context/AppContext";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();

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
                        <Link to="/" className="block px-4 py-2 text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Inicio</Link>
                        <Link
                            to="/map"
                            className="block px-4 py-2 font-bold border-b-2 border-black pb-1 hover:text-yellow-950 animate-pulse"
                            style={{ animationDuration: '2.5s', animationIterationCount: 'infinite' }}
                        >
                            Mapa Interactivo
                        </Link>
                        <Link to="/about" className="block px-4 py-2 text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Quienes Somos</Link>
                        <Link to="/favourites" className="block px-4 py-2 text-[#131700] hover:text-yellow-950 border-b-2 border-black pb-1">Mis Favoritos</Link>
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
                    <Link to="/favourites" className="hover:underline hover:font-bold">Mis Favoritos</Link>
                    <Link to="/blog" className="hover:underline hover:font-bold">Blog</Link>
                    <Link to="/shop" className="hover:underline hover:font-bold">Tienda</Link>
                    <Link to="/contact" className="hover:underline hover:font-bold">Contacto</Link>
                </nav>

                {/* Auth Desktop */}
                <div className="hidden md:flex items-center gap-4 text-black">
                    {user ? (
                        <>
                            <p className="text-md">Hola, {user.name}</p>
                            <button onClick={handleLogout} className="text-sm hover:underline">Cerrar sesión</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-md hover:scale-110 transform duration-300">Hola, identifícate</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
