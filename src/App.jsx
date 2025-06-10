import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout';
import HomePage from './Pages/HomePage';
import Thanks from './Pages/Thanks'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Account from './Pages/Auth/Profile';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import Create from './Pages/Points/Create';
import Show from './Pages/Points/Show';
import Update from './Pages/Points/Update';
import Cart from './Pages/Cart'; // Asegúrate de que la ruta es correcta
import AboutPage from "./Pages/AboutPage";
import BlogPage from "./Pages/BlogPage";
import PostDetails from "./Pages/PostDetails";
import ContactPage from "./Pages/ContactPage";
import ShowPointsPage from './Pages/ShowPointsPage';
import ShopPage from "./Pages/ShopPage";
import PoliticaPrivacidad from "./Pages/PoliticaPrivacidad";
import PoliticaCookies from "./Pages/Cookies";
import AvisoLegal from "./Pages/AvisoLegal";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Orders from "./Pages/OrdersPage";
import Plasticos from "./Pages/Residuos/Plasticos.jsx";
import Chatarra from "./Pages/Residuos/Chatarra.jsx";
import Construccion from "./Pages/Residuos/Construccion.jsx";
import Electronicos from "./Pages/Residuos/Electronicos.jsx";
import Neumaticos from "./Pages/Residuos/Neumaticos.jsx";
import Organica from "./Pages/Residuos/Organica.jsx";
import Aceites from "./Pages/Residuos/Aceites.jsx";
import Textiles from "./Pages/Residuos/Textiles.jsx";
import Vidrios from "./Pages/Residuos/Vidrios.jsx";
export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-[#f7f7f7]">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          {/*<Route path='/shop' element={<Shop />} />*/}
          <Route path='/blog' element={<BlogPage />} />
          <Route path="/blog/post/:id" element={<PostDetails />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/show' element={<ShowPointsPage />} />
          <Route path='/politica-privacidad' element={<PoliticaPrivacidad />} />
          <Route path='/politica-cookies' element={<PoliticaCookies />} />
          <Route path='/aviso-legal' element={<AvisoLegal />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={user ? <Orders /> : <Login />} />
          <Route path='/register' element={user ? <HomePage /> : <Register />} />
          <Route path='/login' element={user ? <HomePage /> : <Login />} />
          <Route path='/create' element={user ? <Create /> : <Login />} />
          <Route path='/profile' element={user ? <Account /> : <Login />} />
          <Route path='/points/:id' element={<Show />} />
          <Route path='/points/update/:id' element={user ? <Update /> : <Login />} />
          <Route path='/thanks' element={<Thanks />} />

          <Route path='/tipos'>
            <Route path='plasticos' element={<Plasticos />} />
            <Route path='vidrios' element={<Vidrios />} />
            <Route path='aceites' element={<Aceites />} />
            <Route path='organica' element={<Organica />} />
            <Route path='electronicos' element={<Electronicos />} />
            <Route path='textiles' element={<Textiles />} />
            <Route path='neumaticos' element={<Neumaticos />} />
            <Route path='chatarra' element={<Chatarra />} />
            <Route path='construccion' element={<Construccion />} />
          </Route>
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}
