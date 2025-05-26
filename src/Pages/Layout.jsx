import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import TopHeader from "../Components/TopHeader";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isShop = location.pathname === "/shop";

  return (
    <div className="relative bg-white dark:bg-[#577759] text-[#577759] min-h-screen transition-colors duration-300">
      <TopHeader />
      <Header isHome={isHome} isShop={isShop} />

      <main>
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}
