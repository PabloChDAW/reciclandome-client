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



  return (
    <>
      <TopHeader />
      <Header isHome={isHome} isShop={isShop} />
      <main>
        <Outlet /> {/** Esto renderiza las rutas hijas. */}
      </main>
      <Footer/>
    </>
  );
}
