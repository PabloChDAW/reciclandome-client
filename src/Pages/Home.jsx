import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map3 from "../Components/Map3";
import InfoBox from "../Components/Infobox";

export default function Home() {
  const [points, setPoints] = useState([]);

  //-----------------------------------------------------
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handleMarkerClick = (point) => {
  setSelectedPoint(point); 
  };
  async function getPoints() {
    const res = await fetch("/api/points");
    const data = await res.json();

    console.log(data);

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
      
      <Map3 points={points} onMarkerClick={setSelectedPoint}></Map3> 

      {selectedPoint && (
        <div className="mt-4 p-4 border rounded-md border-blue-400 bg-blue-50">
          <h2 className="text-lg font-bold mb-2">Punto Seleccionado</h2>
          <p><strong>Latitud:</strong> {selectedPoint.latitude}</p>
          <p><strong>Longitud:</strong> {selectedPoint.longitude}</p>
          <p><strong>Usuario:</strong> {selectedPoint.user.name}</p>
          <Link to={`/points/${selectedPoint.id}`} className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded-lg">
            Ver más
          </Link>
        </div>
      )}

      {<InfoBox point={selectedPoint} />}
      {points.length > 0 ? (
        points.map((point) => (
          <div key={point.id} className="mt-4 mb-4 p-4 border rounded-md border-dashed border-slate-400">
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
