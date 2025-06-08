import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const Product = ({ product, onAddToCart }) => {
  const { id, name, description, price, stock, image } = product;
  const { cart } = useContext(AppContext);
  const cartItem = cart.find(item => item.id === id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = stock === 0;
  const isMaxReached = currentQuantity >= stock;
  const disabled = isOutOfStock || isMaxReached;

  return (
  <div className="bg-white rounded-2xl border bg-slate-300shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-300 p-10 flex flex-col h-full">
      <img
        src={image}
        alt={name}
        className="w-48 sm:w-full h-48 object-cover rounded-lg mb-4 mx-auto"
      />

      <div className="flex flex-col mt-5 gap-4 flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>

        <p className="text-sm text-gray-500 ">
          <span className="font-medium text-gray-600">Descripción:</span> {description}
        </p>

        <p className="text-base font-semibold text-green-600">
          <span className="font-medium text-gray-700">Precio:</span> {price}€
        </p>

        <p className={`text-sm ${isOutOfStock ? 'text-red-600' : 'text-gray-600'}`}>
          <span className="font-medium">Stock:</span>{' '}
          {isOutOfStock ? 'Sin stock' : `${stock} unidades disponibles`}
        </p>
      </div>

      <button
        className={`mt-4 w-full px-4 py-2 rounded-xl text-white font-medium transition-colors duration-300 ${isOutOfStock
            ? 'bg-gray-400 cursor-not-allowed'
            : isMaxReached
              ? 'bg-blue-800 cursor-not-allowed'
              : 'border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] rounded-full'
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
    </div>

  );
};

export default Product;
