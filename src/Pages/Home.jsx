import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [points, setPoints] = useState([]);

  async function getPoints() {
    const res = await fetch("/api/points");
    const data = await res.json();

    // console.log(data);

    if (res.ok) {
      setPoints(data);
    }
  }

  useEffect(() => {
    getPoints();
  }, []);

  return (
    <>
      <h1 className="title">Puntos de reciclaje</h1>
      {points.length > 0 ? (
        points.map((point) => (
          <div key={point.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p>Latitud: {point.latitude}</p>
                <p>Longitud: {point.longitude}</p>
                <small className="text-xs text-slate-600">
                  Creado por {point.user.name} a las{" "} {new Date(point.created_at).toLocaleTimeString()}
                </small>
              </div>
              <Link to={`/points/${point.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">
                Ver más
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No hay puntos</p>
      )}
    </>
  );
}
