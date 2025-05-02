import { Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import Header from "../Components/Header"; // Ajusta la ruta según tu estructura

export default function Layout() {
  const { user } = useContext(AppContext); // Solo si lo necesitas aquí

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
