import { Link } from "react-router-dom";

export default function PointItem({ point, onCenterMap }) {
  return (
  <div
    key={point.id}
    className="p-6 max-w-7xl w-full mx-auto rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-md hover:shadow-lg transition duration-300"
  >
    {/* Información del punto */}
    <div className="mb-4 space-y-1 text-green-900 w-full ">
      <h3 className="text-xl font-bold">{point.name}</h3>
      <p className="text-sm"><span className="font-medium">📍 Tipo:</span> {point.point_type}</p>
      <p className="text-sm"><span className="font-medium">📫 Dirección:</span> {point.address}</p>
      <p className="text-xs italic text-slate-500">
        Creado por <span className="font-semibold">{point.user.name}</span> a las{" "}
        {new Date(point.created_at).toLocaleTimeString()}
      </p>
    </div>

    {/* Botones */}
    <div className="flex flex-col sm:flex-row justify-end gap-3">
      <Link
        to={`/points/${point.id}`}
        className="bg-green-600 hover:bg-green-700 text-white text-center text-sm font-medium px-5 py-2 rounded-xl transition"
      >
        Ver más detalles →
      </Link>
      <button
        onClick={() => onCenterMap(point)}
        className="bg-white hover:bg-green-50 border border-green-500 text-green-700 text-center text-sm font-medium px-5 py-2 rounded-xl transition"
      >
        Centrar en el mapa
      </button>
    </div>
  </div>
);

}
