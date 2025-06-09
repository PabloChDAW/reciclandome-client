import { Link } from "react-router-dom";

export default function PointItem({ point, onCenterMap }) {
  return (
  <div
    key={point.id}
    className="p-4 max-w-7xl w-full mx-auto rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between min-h-[200px]"
  >
    {/* Información del punto */}
    <div className="mb-4 space-y-1 text-green-900 w-full ">
      <h3 className="text-xl font-bold">{point.name}</h3>
      <div className="flex flex-wrap gap-1 items-center">
        <span className="font-medium">♻️ Tipos:</span>
        {point.types && point.types.length > 0 ? (
          point.types.map(type => (
            <span 
              key={type.id}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {type.name}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-xs">No especificado</span>
        )}
      </div>
      <p className="text-sm"><span className="font-medium">📫 Dirección:</span> {point.address}</p>
      <p className="text-xs italic text-slate-500">
        Creado por <span className="font-semibold">{point.user.name}</span> el: {" "}
        {new Date(point.created_at).toLocaleDateString()} a las {new Date(point.created_at).toLocaleTimeString()}
      </p>
    </div>

    {/* Botones */}
    <div className="flex flex-col lg:flex-row justify-center gap-3">
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
      {point.url && (
          <a
            href={point.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-medium px-5 py-2 rounded-xl transition"
          >
            Cómo llegar 🗺️
          </a>
      )}
    </div>
  </div>
);

}
