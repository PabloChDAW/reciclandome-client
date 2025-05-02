import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout';
import HomePage from './Pages/Home';
import Shop from './Pages/Shop'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import Create from './Pages/Points/Create';
import Show from './Pages/Points/Show';
import Update from './Pages/Points/Update';

import Header from "./Components/Header";
import TopHeader from './Components/TopHeader';
import Footer from "./Components/Footer";
import Footer2 from "./Components/FooterLogin";
import AboutPage from "./Pages/AboutPage";
import BlogPage from "./Pages/BlogPage";
import ContactPage from "./Pages/ContactPage";
import ShopPage from "./Pages/ShopPage";
import { CartProvider } from './context/CartContext';
import PoliticaPrivacidad from "./Pages/PoliticaPrivacidad";
import PoliticaCookies from "./Pages/Cookies";
import AvisoLegal from "./Pages/AvisoLegal";
import ScrollToTop from "./Components/ScrollToTop.JSX";


export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppInner />
      </BrowserRouter>
    </CartProvider>
  );
}

function AppInner() {
  const { user } = useContext(AppContext);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isShop = pathname === '/shop';
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';

  return (
    <div className="bg-[#f7f7f7]">
      <TopHeader />
      {!isHome && !isShop && <Header />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/cookies" element={<PoliticaCookies />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path='/register' element={user ? <HomePage /> : <Register />} />
          <Route path='/login' element={user ? <HomePage /> : <Login />} />
          <Route path='/create' element={user ? <Create /> : <Login />} />
          <Route path='/points/:id' element={<Show />} />
          <Route path='/points/update/:id' element={user ? <Update /> : <Login />} />
      </Routes>
      {/* Footer dinámico */}
      {isLogin || isRegister ? <Footer2 /> : <Footer />}    </div>
  );
}
