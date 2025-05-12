import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map3 from "../Components/Map3";
import InfoBox from "../Components/Infobox";
import PointItem from "../Components/PointItem";
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
    console.log("hola")
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

      {/* {selectedPoint && (
        <div className="mt-4 p-4 border rounded-md border-blue-400 bg-blue-50">
          <h2 className="text-lg font-bold mb-2">Punto Seleccionado</h2>
          <p><strong>Latitud:</strong> {selectedPoint.latitude}</p>
          <p><strong>Longitud:</strong> {selectedPoint.longitude}</p>
          <p><strong>Usuario:</strong> {selectedPoint.user.name}</p>
          <Link to={`/points/${selectedPoint.id}`} className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded-lg">
            Ver más
          </Link>
        </div>
      )} Esto es el infobox en realidad, debería borrarse en un futuro pero lo dejo aquí ahora para su entendimiento*/}

      {<InfoBox point={selectedPoint} />}
      {points.length > 0 ? (
        points.map((point) => (
          <PointItem key={point.id} point={point} />
        ))
      ) : (
        <p>No hay puntos</p>
      )}
    </>
  );
}
