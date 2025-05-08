import { useContext, useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Header from "../Components/Header";
import TopHeader from "../Components/TopHeader";
import Footer from "../Components/Footer";


export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isShop = location.pathname === "/shop";


  async function handleLogout(e) {
    e.preventDefault();

    try {
      // Realizamos la solicitud de logout
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Verificamos si la respuesta es OK
      if (!res.ok) {
        throw new Error("Error en el logout: " + res.statusText);
      }

      // Si la respuesta es exitosa, parseamos los datos
      const data = await res.json();
      console.log(data);

      // Limpiamos el estado y localStorage
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");

      // Navegamos a la página principal
      navigate("/");

    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  }




  return (
    <div className="relative">
      <TopHeader />
      <Header isHome={isHome} isShop={isShop} />
      <main>
        <Outlet /> {/** Esto renderiza las rutas hijas. */}
      </main>
      <Footer/>
    </div>
  );
}
