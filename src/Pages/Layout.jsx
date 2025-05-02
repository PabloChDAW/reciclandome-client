import { useContext, useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Header from "../Components/Header";
import TopHeader from "../Components/TopHeader";


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
    <TopHeader/>
      <Header/>
      <main>
        <Outlet /> {/** Esto renderiza las rutas hijas. */}
      </main>
    </>
  );
}
