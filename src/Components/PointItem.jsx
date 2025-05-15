import { Link } from "react-router-dom";

export default function PointItem({ point, onCenterMap }) {
  return (
    <div key={point.id} className="mt-4 mb-4 p-4 border rounded-md border-dashed border-slate-400">
      <div className="mb-2 flex items-start justify-between">
        <div>
        {/* <p>ID: {point.id}</p>
        <p>Usuario: {point.user_id}</p>
        <p>Coordenadas: {point.latitude}, {point.longitude}</p>
        <p>Teléfono: {point.phone}</p>
        <p>Correo: {point.email}</p> */}
        <h1>{point.name}</h1>
        <p>Tipo de punto: {point.point_type}</p>
        {/* <p>Tipo de lugar: {point.place_type}</p> */}
        
        <p>Dirección: {point.address}</p>
        {/* <p>Localidad:{point.city}</p>
        <p>Región:{point.region}</p>
        <p>País:{point.country}</p>
        <p>Código postal:{point.postcode}</p>
        <p>Vía: {point.way}</p>
        <p>Descripción: {point.description}</p>
        <p>Url: {point.url}</p> */}
          <small className="text-xs text-slate-600">
            Creado por {point.user.name} a las{" "} 
            {new Date(point.created_at).toLocaleTimeString()}
          </small>
        </div>
        <Link 
          to={`/points/${point.id}`} 
          className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
        >
          Ver más
        </Link>
        <button
            onClick={() => onCenterMap(point)}
            className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
        >
            Centrar
        </button>
      </div>
    </div>
  );
}