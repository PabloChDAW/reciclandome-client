import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { AppContext } from "../Context/AppContext";

export default function Header({ isHome = false, isShop = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    user,
    cart,
    totalItems,
    increment,
    decrement,
    clearCart,
    removeItem,
    setUser,
    setToken,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const token = localStorage.getItem("token");

  const location = useLocation(); // Obtiene la ruta actual

  const [showLogoutToast, setShowLogoutToast] = useState(false);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-green-900 font-bold"
      : "hover:text-green-900";
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          alert("No puedes añadir más de este producto. Stock máximo alcanzado.");
          return prevCart;
        }
      }
      return [...prevCart, { ...product, quantity: 1, stock: product.stock }];
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };


  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      clearCart();
      setShowLogoutToast(true); // <-- Mostrar toastr aquí
      // Ocultar toastr después de 2 segundos y navegar
      setTimeout(() => {
        setShowLogoutToast(false);
        navigate("/");
      }, 2000);
      navigate("/");
    }
  }
  useEffect(() => {
    if (!isHome && !isShop) return;

    const handleScroll = () => {
      const screenWidth = window.innerWidth; // Obtener el tamaño de la pantalla

      if (screenWidth >= 1440) {
        // Pantallas grandes (1440px o mayores)
        setScrolled(window.scrollY > 150); // Cambia el valor de desplazamiento según lo necesites
      } else if (screenWidth >= 1024) {
        // Pantallas medianas (1024px o mayores)
        setScrolled(window.scrollY > 600); // Cambia el valor de desplazamiento según lo necesites
      } else if (screenWidth >= 768) {
        // Pantallas medianas (768px o mayores, como tablets)
        setScrolled(window.scrollY > 600); // Cambia el valor de desplazamiento según lo necesites
      } else {
        // Pantallas móviles
        setScrolled(window.scrollY > 550); // Cambia el valor de desplazamiento según lo necesites
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, isShop]);

  useEffect(() => {
    if (!isHome && !isShop) return;

    const timeout = setTimeout(() => setScrolled(true), 300); // delay inicial
    return () => clearTimeout(timeout);
  }, []);

  const headerClass =
    (isHome || isShop) && !scrolled
      ? "fixed top-20 z-50 sm:top-10 w-full bg-transparent shadow-md text-white transition-all duration-700 ease-out"
      : "sticky w-full bg-[#EBF0EB] shadow-md text-black transition-all duration-1000 ease-out opacity-100";

  return (
    <header className={`z-50 transition-all duration-500 ${headerClass}`}>
      <div className="mx-auto px-4 py-3 bg-opacity-40 z-99 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center hover:scale-110 transform duration-700 gap-2"
        >
          <img
            src="/reciclin_verde.png"
            alt="Logo"
            className="h-auto w-16 md:w-12 lg:w-16"
          />
        </Link>

        {/* Botón hamburguesa - solo visible en móviles */}
        <div className="md:hidden z-50 text-black">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Menú desplegable móvil con animación */}
        <>
          {/* Backdrop con transición de opacidad */}
          <div
            className={`
                        fixed inset-0 bg-black z-40 transition-opacity duration-700
                        ${menuOpen
                ? "bg-opacity-70"
                : "bg-opacity-0 pointer-events-none"
              }
                    `}
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Menú lateral con transición de deslizamiento */}
          <div
            className={`
                            fixed top-0 right-0 h-full w-3/4 sm:w-2/5 bg-white z-50 shadow-lg transform transition-transform duration-700 ease-in-out
                            ${menuOpen ? "translate-x-0" : "translate-x-full"}
                        `}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)}>
                <HiX className="text-2xl text-[#131700]" />
              </button>
            </div>

            <nav className="flex flex-col items-start gap-5 px-6 text-sm text-[#131700]">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`${getLinkClass("/")}`}
              >
                🏠 Inicio
              </Link>
              {/*<Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 font-bold animate-pulse hover:text-green-900"
              >
                🗺️ Tipo de reciclaje
              </Link>*/}
              <Link
                to="/show"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 font-bold animate-pulse hover:text-green-900"
              >
                🗺️ Ver puntos limpios
              </Link>
              <Link
                to="/create"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 font-bold animate-pulse hover:text-green-900"
              >
                🗺️ Crear Punto en el mapa
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`${getLinkClass("/about")}`}
              >
                👥 Quiénes Somos
              </Link>
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className={`${getLinkClass("/shop")}`}
              >
                🛍️ Tienda
              </Link>
              <Link
                to="/blog"
                onClick={() => setMenuOpen(false)}
                className={`${getLinkClass("/shop")}`}
              >
                📝 Blog
              </Link>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className={`${getLinkClass("/orders")}`}
              >
                📦 Mis pedidos
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={`${getLinkClass("/contact")}`}
              >
                📞 Contacto
              </Link>

              <div className="pt-10 border-t border-[#166534] w-full">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-lg">Hola, {user.name}</p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 border border-red-600 bg-red-700 hover:bg-white text-white hover:text-red-700 px-3 py-2 rounded-md text-sm transition duration-200"
                      title="Cerrar sesión"
                    >
                      <FiLogOut className="text-xl" />
                      <span>CERRAR SESIÓN</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      👤 INICIAR SESIÓN
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      📝 REGISTRO
                    </Link>
                  </div>
                )}
              </div>
              <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
                <Link
                  to="/cart"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="relative flex items-center justify-center border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] rounded-full shadow-lg py-3 px-5 text-sm  transition-all duration-300"
                >
                  🛒 VER CESTA
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        </>

        {/* Navegación desktop */}
        <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-6 xl:gap-8 text-[#131700] lg:text-[16px] xl:text-[20px] sm:text-[14px]">
          <Link to="/" className={`${getLinkClass("/")}`}>
            Inicio
          </Link>

          <div className="relative group hidden md:block">
            <div className="hover:underline hover:font-bold cursor-pointer">
              Mapa <span className="text-xs">&#9660;</span>
            </div>
            {/* TODO METER RUTA INTERACTIVA AQUI */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-gray-300 rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-40">
              {/*<Link
                to="/"
                className="block px-4 py-2 text-center text-[#131700] hover:text-[#166534] hover:bg-gray-200 transition duration-700"
              >
                Tipo de reciclaje
              </Link>*/}
              <Link
                to="/create"
                className="block px-4 py-2 text-center text-[#131700] hover:text-[#166534] hover:bg-gray-200 transition duration-700"
              >
                Crear punto
              </Link>
              <Link
                to="/show"
                className="block px-4 py-2 text-center text-[#131700] hover:text-[#166534] hover:bg-gray-200 transition duration-700"
              >
                Ver puntos limpios
              </Link>
            </div>
          </div>

          <Link to="/about" className={`${getLinkClass("/about")}`}>
            Quienes Somos
          </Link>
          <Link to="/blog" className={`${getLinkClass("/blog")}`}>
            Blog
          </Link>
          <Link to="/shop" className={`${getLinkClass("/shop")}`}>
            Tienda
          </Link>
          <Link to="/orders" className={`${getLinkClass("/orders")}`}>
            Mis Pedidos
          </Link>
          <Link to="/contact" className={`${getLinkClass("/contact")}`}>
            Contacto
          </Link>
        </nav>

        {/* Auth + Carrito Desktop */}
        <div className="hidden md:flex items-center gap-6 text-[#131700] relative">
          {user ? (
            <>
              <p className="lg:text-[20px] sm:text-[12px] animate-bounce text-green-800">
                👋 ¡Hola, {user.name}!
              </p>
              <button
                onClick={handleLogout}
                className="text-xl hover:text-red-500"
                title="Cerrar sesión"
              >
                <FiLogOut />
              </button>{" "}
            </>
          ) : (
            <Link
              to="/login"
              className="lg:text-[20px] sm:text-[12px] text-[#166534] hover:text-[#131700] hover:scale-110 transform duration-300"
            >
              Hola, identifícate
            </Link>
          )}

          {/* Carrito */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative flex items-center text-sm hover:underline"
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

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#166534] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <>
                {/* Fondo oscuro que cierra el panel al hacer clic */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-70 z-40"
                  onClick={() => setDropdownOpen(false)}
                />

                <div
                  className={`fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white shadow-lg border-l z-50 transition-transform duration-500 ${dropdownOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                  <div className="flex flex-col h-full p-4">
                    {/* Encabezado */}
                    <div className="flex justify-between items-center py-5 mb-6 border-b border-[#577759] border-opacity-20">
                      <h2 className="text-2xl font-semibold">🛒 TU CESTA</h2>
                      <button
                        onClick={() => setDropdownOpen(false)}
                        className="text-gray-500 hover:text-gray-800 transition"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Contenido del carrito con scroll si es necesario */}
                    <div className="flex-1 overflow-y-auto">
                      {cart.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                          Tu carrito está vacío. ¡Añade productos! 🛍️
                        </p>
                      ) : (
                        <>
                          <ul className="space-y-10 mb-6">
                            {cart.map((item) => (
                              <li
                                key={item.id}
                                className="flex justify-between items-center text-md"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                                <span className="w-full ml-2">{item.name}</span>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => decrement(item.id)}
                                    className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full"
                                  >
                                    -
                                  </button>
                                  <span className="font-medium p-1">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => increment(item.id)}
                                    disabled={item.quantity >= item.stock}
                                    className={`w-6 h-6 flex items-center justify-center rounded-full ${item.quantity >= item.stock
                                      ? 'bg-gray-200 cursor-not-allowed opacity-50'
                                      : 'bg-gray-100 hover:bg-gray-200'}
                                  `}
                                  >
                                    +
                                  </button>

                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-gray-400 hover:text-red-500 ml-2"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>

                          {/* Total */}
                          <div className="flex justify-between items-center text-lg font-semibold mb-4">
                            <span className="text-[#166534]">Total: 💰</span>
                            <span className="text-[#577759]">
                              {cart
                                .reduce(
                                  (acc, item) =>
                                    acc + item.price * item.quantity,
                                  0
                                )
                                .toFixed(2)}{" "}
                              €
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Botón fijo abajo */}
                    {cart.length > 0 && (
                      <Link
                        to="/cart"
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/cart");
                        }}
                        className="mt-4 px-8 py-3 w-full border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] rounded-full text-sm transition-all duration-500 flex items-center justify-center gap-2"
                      >
                        VER CARRITO 🛍️
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showLogoutToast && (
  <div
    className="fixed top-5 right-5 bg-gradient-to-r from-green-700 to-green-900 text-white px-6 py-3 rounded-md shadow-md flex items-center justify-between gap-4 max-w-xs animate-fade-slide-in z-50 opacity-70"
    role="alert"
    aria-live="assertive"
  >
    <div className="flex items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm">
        ¡Hasta pronto! Aquí siempre hay un lugar para ti.      
      </span>
    </div>
    <button
      onClick={() => setShowLogoutToast(false)}
      className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded transition-colors"
      aria-label="Cerrar notificación"
    >
      &#10005;
    </button>
  </div>
)}



    </header>
  );
}
