import { useContext, useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken, cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
      navigate("/");
    }
  }

  const increment = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity < p.stock ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
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
                        <li
                          key={item.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="truncate w-24">{item.name}</span>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => decrement(item.id)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              -
                            </button>

                            <span className="font-medium p-1">{item.quantity}</span>

                            <button
                              onClick={() => {
                                if (item.quantity < item.stock) {
                                  increment(item.id);
                                }
                              }}
                              disabled={item.quantity >= item.stock}
                              className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                                item.quantity >= item.stock
                                  ? "bg-red-200 text-red-600 cursor-not-allowed"
                                  : "bg-gray-100 hover:bg-gray-200"
                              }`}
                            >
                              +
                            </button>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
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
              </Link>

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
        <Outlet />
      </main>
    </>
  );
}
