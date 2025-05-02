import React from 'react';

const Product = ({ product, onAddToCart }) => {
  const { id, name, description, price, stock } = product;

  const isOutOfStock = stock === 0;

  return (
    <div className="product-card p-4 border rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-bold">{name}</h2>

      <p className="text-sm text-gray-500 mb-2">
        <strong>Descripción:</strong> {description}
      </p>

      <p className="text-lg font-semibold text-green-600">
        <strong>Precio:</strong> ${price}
      </p>

      <p className={`text-sm ${isOutOfStock ? 'text-red-600' : 'text-gray-600'}`}>
        <strong>Stock:</strong>{' '}
        {isOutOfStock ? 'Sin stock' : `${stock} unidades disponibles`}
      </p>

      <div className="mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            isOutOfStock
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product)}
        >
          {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
};

export default Product;
