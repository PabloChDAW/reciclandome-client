import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import PayPalButton from "../Components/PayPalButton";

export default function Cart() {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  const increment = (id) => {
    setCart(prev =>
      prev.map(p =>
        p.id === id && p.quantity < p.stock
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decrement = (id) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id && p.quantity > 1
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="dark:bg-[#344735] p-6 sm:p-10 my-10 sm:py-20 sm:max-w-7xl mx-auto rounded-lg shadow-md">
      <h2 className="text-3xl font-bold top-0 mb-8 border-b pb-4 dark:text-white">🛍️ TU CARRITO</h2>

      {cart.length === 0 ? (
        <div className="py-12 text-center">
          <p className="dark:text-white text-lg">Tu carrito está vacío 😢</p>
          <p className="dark:text-white text-sm mt-2">¡Explora nuestros productos y añade algo bonito! 💚</p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => {
              const subtotal = Number(item.price) * item.quantity;
              return (
                <li key={item.id} className="py-6 flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center w-full dark:text-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md mr-4 shrink-0"
                    />
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm mt-1">
                        💸 {Number(item.price).toFixed(2)}€ × {item.quantity} ={" "}
                        <span className="font-medium">{subtotal.toFixed(2)}€</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Stock disponible: {item.stock}
                      </p>
                    </div>
                  </div>


                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrement(item.id)}
                      className=" w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <span className="text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#577759">
                          <path d="M200-440v-80h560v80H200Z" />
                        </svg>
                      </span>
                    </button>

                    <span className="w-6 text-center font-medium text-gray-800 dark:text-white">{item.quantity}</span>

                    <button
                      onClick={() => increment(item.id)}
                      disabled={item.quantity >= item.stock}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        item.quantity >= item.stock
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      <span className="text-lg dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#577759">
                          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                      </span>
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 transition-all hover:scale-110 duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-[#577759] dark:fill-white transition-colors duration-300">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-col md:flex-col justify-between items-start md:items-center gap-4  p-6 rounded-lg shadow-md">
              <div>
                <p className="dark:text-white text-sm">
                  🧺 Total ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
                </p>
                <p className="text-2xl text-center font-bold text-[#166534] dark:text-white">
                  {totalPrice.toFixed(2)}€
                </p>
              </div>


              <div className="w-full sm:w-auto z-10">
                <PayPalButton amount={totalPrice} cart={cart} />
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
