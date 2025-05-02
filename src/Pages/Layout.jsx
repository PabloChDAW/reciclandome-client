import { useContext, useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {

  const { user, token, setUser, setToken, cart, setCart } = useContext(AppContext); //Estados globales o contextos de la aplicación
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


  // Cerrar el dropdown si clic fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  async function handleLogout(e) {
    e.preventDefault();

    /* Petición de logout */
    const res = await fetch('/api/logout', {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await res.json();
    console.log(data);

    if(res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate('/');
    }
  }


  //funciones para el carrito
  const increment = (id) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  };

  const decrement = (id) => {
    setCart(prev =>
      prev
        .map(p => (p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p))
        .filter(p => p.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };



  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/shop" className="nav-link">
            Shop
          </Link>


          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="nav-link relative"
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
                            <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increment(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                            <button onClick={() => removeItem(item.id)} className="text-red-500 ml-2">❌</button>
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

          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-slate-400 text-xs">{user.name}</p>
              <Link to="/create" className="nav-link">
                New Point
              </Link> {/** Como todas las rutas están anidadas a la raíz, montar el componente /create o
               * cualquier otro no desmonta el componente Layout, por lo que los mensajes de usuario permanecen en
               * el layout siempre. Es contraintuitivo porque por definición navegar implica hacer cambios en toda la página,
               * excepto que en este caso navegamos a una ruta que contiene este componente también. Además, Layout no vuelve
               * a montarse de nuevo al navegar a las rutas anidades, sino que se reutiliza desde la memoria. Otro dato 
               * interesante es que esto permite tener una mejor organización del código, pues se establece el usuario logueado
               * en el layout y esto afecta automáticamente todos los componentes hijos, ¡no hace falta tener una gestión de
               * estado global para cada componente hijo ni repetir la lógica!
               */}

              <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
              </form>
            </div>
            
          ) : (
            <div className="space-x-4">
            <Link to="/register" className="nav-link">
              Sing up
            </Link>

            <Link to="/login" className="nav-link">
              Log in
            </Link>
          </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet /> {/** Esto renderiza las rutas hijas. */}
      </main>
    </>
  );
}
