import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Tu carrito</h2>

      {cart.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => {
              const subtotal = Number(item.price) * item.quantity;
              return (
                <li
                  key={item.id}
                  className="py-6 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {Number(item.price).toFixed(2)}€ unidad × {item.quantity} ={" "}
                      <span className="font-medium text-gray-800">
                        {subtotal.toFixed(2)}€
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Stock disponible: {item.stock}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrement(item.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <span className="text-gray-600">-</span>
                    </button>

                    <span className="w-6 text-center font-medium">{item.quantity}</span>

                    <button
                      onClick={() => increment(item.id)}
                      disabled={item.quantity >= item.stock}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        item.quantity >= item.stock
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      <span>+</span>
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Total ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalPrice.toFixed(2)}€
                </p>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
              >
                Proceder al pago
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
