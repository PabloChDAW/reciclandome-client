import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

export default function MyOrders() {
    const { user, token } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch(`https://reciclandome-api-main-laravelcloud-4b3jba.laravel.cloud/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                });
                const data = await res.json();

                if (res.ok) {
                    setOrders(data.orders || []);
                } else {
                    console.error("Error al obtener pedidos:", data);
                }
            } catch (error) {
                console.error("Error de red:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [token]);

    if (loading) return <p className="text-center mt-20">Cargando pedidos...</p>;

    return (
        <div className="max-w-5xl mx-auto py-20 px-4">
            <h1 className="dark:text-white text-3xl font-bold mb-8 text-center">📦 Mis pedidos</h1>

            {orders.length === 0 ? (
                <p className="text-center text-slate-600 dark:text-white">Aún no has realizado ningún pedido.</p>
            ) : (
                <ul className="space-y-6">
                    {orders.map((order) => (
                        <li key={order.id} className="border rounded-xl p-6 bg-white shadow-md">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">Pedido #{order.id}</h2>
                                <span className="text-sm text-slate-600">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-slate-700 mb-1">
                                <strong>Estado:</strong> {order.status}
                            </p>
                            <p className="text-sm text-slate-700 mb-4">
                                <strong>Total:</strong> {order.total}€
                            </p>

                            <hr />

                            <ul className="divide-y divide-slate-200">
                                {order.products.map((product) => (
                                    <li key={product.id} className="flex items-center gap-4 py-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium">{product.name}</h3>
                                            <p className="text-sm text-slate-600">
                                                Precio: {product.price}€ &nbsp;|&nbsp; Cantidad: {product.pivot.quantity}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
