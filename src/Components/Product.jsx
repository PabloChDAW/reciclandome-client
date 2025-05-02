import React from 'react';

const Product = ({ product }) => {
  // Desestructuramos las propiedades del producto
  const {id, name, description, price, stock} = product;

  return (
    <div className="product-card p-4 border rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-bold">{name}</h2>

      <p className="text-sm text-gray-500 mb-2">
        <strong>Descripción:</strong> {description}
      </p>

      <p className="text-lg font-semibold text-green-600">
        <strong>Precio:</strong> ${price}
      </p>

      <p className="text-sm text-gray-600">
        <strong>Stock:</strong> {stock} unidades disponibles
      </p>

      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Product;
