import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map3 from "../Components/Map3";

export default function Home() {
  const [points, setPoints] = useState([]);

  // HOLA DE NUEVO YISUCRAIS :) 
  // Aquí te dejo esto. Un estado junto con el evento.
  // Te he dejado todo esto porque la estructura que hay que seguir es esta y de otra forma tendríamos muchos spagetis.
  // Te comento!. Desde el HOME llamamos al mapa que tiene sus chinchetas. Podrías pensar que el evento para ver qué
  // chincheta clickas puedes hacerlo en el mapa, pero esto sería un BLUNDER. Porque en este componente necesitas saber
  // también qué chincheta ha sido clickada ya que dependiendo de la chincheta la info es diferente.
  // La petición API específica del punto en función de la chincheta tienes que hacerla tú, pero es copiar y pegar la 
  // petición api de show y ingeniertales para pasarle la id. Con eso ya podrías poner en esa pantallita lo que tu quieras.
  // Recuerda que debe ser un resumen porque la pantallita tiene que tener el botón (ver más) que te lleve a la verdadera
  // página de punto. 
  // Cuando acabes con todo refactorizaré la aplicación moviendo todas las peticiones API a un mismo archivo separado. 
  // Hasta entonces.
  // const [selectedPoint, setSelectedPoint] = useState(null);
  // const handleMarkerClick = (point) => {
  //   setSelectedPoint(point); // Actualiza el punto seleccionado
  // };
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
      <Map3 points={points}></Map3> 
      {/* QUE NO ME ENTERE YO QUE SE TE OLVIDA AÑADIR AQUÍ ARRIBA EL PROP, EIN? KEMENFADO >:( */}
      {/* <InfoBox point={selectedPoint} /> Y esto para el componente*/}
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
