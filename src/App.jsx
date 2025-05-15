import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout';
import HomePage from './Pages/HomePage';
import Thanks from './Pages/Thanks'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
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
          <Route path='/register' element={user ? <HomePage /> : <Register />} />
          <Route path='/login' element={user ? <HomePage /> : <Login />} />
          <Route path='/create' element={user ? <Create /> : <Login />} />
          <Route path='/points/:id' element={<Show />} />
          <Route path='/points/update/:id' element={user ? <Update /> : <Login />} />
          <Route path='/thanks' element={<Thanks />} />

        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}
