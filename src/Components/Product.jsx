import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';

const Product = ({ product, onAddToCart }) => {
  const { id, name, description, price, stock, image } = product;
  const { cart } = useContext(AppContext);
  const cartItem = cart.find(item => item.id === id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = stock === 0;
  const isMaxReached = currentQuantity >= stock;
  const disabled = isOutOfStock || isMaxReached;
  const [showModal, setShowModal] = useState(false);

  return (
    <div onMouseLeave={() => setShowModal(false)} className="bg-white dark:bg-[#344735] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-300 p-6 flex flex-col h-full">
      <img
        src={image}
        alt={name}
        className="w-full sm:w-full h-56 sm:h-72 object-cover rounded-lg mb-4 mx-auto"

      />

      <div className="flex flex-col justify-between flex-1 space-y-3">
        <h2 className="text-xl font-bold  dark:text-white">{name}</h2>

        <p className="text-sm  dark:text-gray-300 truncate">
            <span className="font-medium dark:text-gray-200">Descripción:</span>{' '}
            {description}
          </p>

          {description.length > 50 && (
            <button
              onClick={() => setShowModal(true)}
              className="text-xs mt-1 px-2 py-1 rounded-full bg-gray-200 dark:bg-[#577759] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 w-fit"
            >
              Ver más ▼
            </button>
          )}

        <p className="text-base font-semibold text-green-700 dark:text-green-400">
          <span className=" font-semibold  dark:text-white">Precio:</span> {price}€
        </p>

        <p className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
          <span className="font-medium">Stock:</span>{' '}
          {isOutOfStock ? 'Sin stock' : `${stock} unidades disponibles`}
        </p>
      </div>

      <button
        className={`mt-4 w-full px-4 py-2 rounded-xl text-white font-medium transition-colors duration-300 ${isOutOfStock
          ? 'bg-gray-400 cursor-not-allowed'
          : isMaxReached
            ? 'bg-blue-800 cursor-not-allowed'
            : 'border border-[#166534] bg-[#166534] dark:bg-[#577759] hover:bg-white dark:hover:bg-white text-white hover:text-[#166534] dark:hover:text-[#577759] rounded-full'
          }`}
        disabled={disabled}
        onClick={() => onAddToCart(product)}
      >
        {isOutOfStock
          ? 'Agotado'
          : isMaxReached
            ? 'Máximo alcanzado'
            : 'Agregar al carrito'}
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <div
            className="bg-white dark:bg-[#344735] rounded-xl p-6 max-w-md w-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Descripción completa
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 dark:text-white hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Product;
