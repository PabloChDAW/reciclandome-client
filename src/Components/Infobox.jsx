
import { Link } from "react-router-dom";

const InfoBox = ({ selectedPoint }) => {
  if (!selectedPoint) return null;

  return (
    <section className="mt-10 p-6 rounded-2xl border border-blue-200 bg-blue-50 shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
            <span className="text-xl">📍</span> Detalles del Punto {selectedPoint.name}
        </h2>
        <ul className="text-sm text-blue-900 space-y-1">
            <li><h1 className="font-medium"></h1> </li>
            <li><span className="font-medium">Tipo de punto:</span> {selectedPoint.point_type}</li>
            <li><span className="font-medium">Dirección:</span> {selectedPoint.address}</li>
            <li><span className="font-medium">Creador:</span> {selectedPoint.user.name}</li>
        </ul>
        <Link
            to={`/points/${selectedPoint.id}`}
            className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
        >
            Ver más detalles →
        </Link>
    </section>
  );
};

export default InfoBox;

