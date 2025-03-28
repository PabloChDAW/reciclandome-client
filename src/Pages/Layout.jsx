import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>

          {user ? (
            <p className="text-slate-400 text-xs">{user.name}</p>
          ) : (
            <div className="space-x-4">
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>

            <Link to="/login" className="nav-link">
              Login
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
