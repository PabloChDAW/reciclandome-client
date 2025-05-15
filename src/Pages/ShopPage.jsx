import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import SliderShop from "../Components/SliderShop";
import { Link } from "react-router-dom";
import { getAllProducts } from '../api/products';
import Product from "../Components/Product";


const sliderImages = [
  "/fondo_tienda.jpg",
  "/fondo_tienda2.jpg",
  "/fondo_tienda3.jpg",
];

const ShopPage = () => {
  const { cart, setCart, token } = useContext(AppContext); // Asegúrate de tener el token en el contexto
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(token);
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <SliderShop images={sliderImages} interval={4000} />
      <div className="flex flex-col justify-center items-center py-20 max-w-7xl mx-auto">
        <div className="gap-5 max-w-7xl w-full items-center">
          <div className="flex flex-col gap-5 max-w-7xl w-full items-center">
            <div className="flex flex-col items-center lg:col-span-2">
              <h1 className="text-4xl font-bold text-center mb-2">
                Camisetas 100% recicladas ♻️
              </h1>
              <p className="text-center text-lg text-gray-600 mb-10">
                ¡Únete a nuestra causa y luce con conciencia ambiental! 🌿
              </p>

              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {showToast && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 transition-opacity duration-500">
                  <Link to="/cart">✅ Producto añadido al carrito </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
