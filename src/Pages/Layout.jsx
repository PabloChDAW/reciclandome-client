import { useContext, useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Header from "../Components/Header";
import TopHeader from "../Components/TopHeader";
import Footer from "../Components/Footer";


export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

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
      <Header />
      <main>
        <Outlet /> {/** Esto renderiza las rutas hijas. */}
      </main>
      <Footer/>
    </>
  );
}
