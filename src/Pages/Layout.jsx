import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import TopHeader from "../Components/TopHeader";
import Footer from "../Components/Footer";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isShop = location.pathname === "/shop";

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
