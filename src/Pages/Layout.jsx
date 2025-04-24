import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext); //Estados globales o contextos de la aplicación
  const navigate = useNavigate();

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

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>

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
