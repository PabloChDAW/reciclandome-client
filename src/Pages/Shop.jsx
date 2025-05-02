import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/products';
import Product from '../Components/Product';

export default function Shop() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then(data => setProductos(data))
            .catch(err => console.error(err));
    }, []);

    console.log(productos)

    return (
        <>
            <h2>Shop</h2>
            <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productos.map((producto) => (
                <Product key={producto.id} product={producto} />
            ))}
            </div>
        </>
    )
}