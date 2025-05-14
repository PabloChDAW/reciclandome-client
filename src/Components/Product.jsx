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
    <div className="product-card p-4 border rounded-lg shadow-md mb-4">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Descripción:</strong> {description}
      </p>

      <p className="text-lg font-semibold text-green-600">
        <strong>Precio:</strong> {price}€
      </p>

      <p className={`text-sm ${isOutOfStock ? 'text-red-600' : 'text-gray-600'}`}>
        <strong>Stock:</strong>{' '}
        {isOutOfStock ? 'Sin stock' : `${stock} unidades disponibles`}
      </p>

      <div className="mt-4">
        <button
          className={`px-4 py-2 rounded-lg w-full text-white ${
            isOutOfStock
              ? 'bg-gray-400 cursor-not-allowed'
              : isMaxReached
              ? 'bg-blue-800 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
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
    </div>
  );
};

export default Product;
