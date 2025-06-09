import { useEffect, useState, useRef } from "react";
import Map3 from "../Components/Map3";
import InfoBox from "../Components/Infobox";
import PointItem from "../Components/PointItem";

export default function ShowPointsPage() {
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [cargando, setCargando] = useState(true);

    // Para poder usar eventos y utilidades del mapa fuera del mismo
    // se debe centralizar un estado que le identifique en la página que lo carga
    // Además, las utilidades que quieran usarse del mapa en otros componentes deben declararse aquí y 
    // ser pasadas como props al componente del mapa para ser gestionados desde allí. 
    const mapRef = useRef(null); 

    const handleMarkerClick = (point) => {
        setSelectedPoint(point);
        centerMapOnPoint(point);
        const mapaElement = document.getElementById('mapa');
        if (mapaElement) {
            mapaElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const centerMapOnPoint = (point) => {
        if (mapRef.current) {
            const latitude = parseFloat(point.latitude);
            const longitude = parseFloat(point.longitude);
            
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 14,
                speed: 1.2,
                curve: 1.42,
                essential: true
            });
        }
    };
    // Obtener puntos de reciclaje
    async function getPoints() {
        const res = await fetch("https://reciclandome-api-main-nfmp30.laravel.cloud/points");
        const data = await res.json();
        console.log(data);


        if (res.ok) {
            setPoints(data);
        }
        setCargando(false);
    }
    useEffect(() => {
        getPoints();
    }, []);


    return (
        <>
            <div className="py-20 ">

                <h1 className="dark:text-white text-3xl font-bold text-center mb-8">
                    ♻️ Puntos de Reciclaje
                </h1>

                <div id="mapa" className="mb-10 overflow-hidden border border-slate-200 shadow-[0_0_20px_3px_rgba(34,197,94,0.4)] transition-all duration-500">
                    <Map3 points={points} onMarkerClick={handleMarkerClick} centerOnPoint={selectedPoint} />
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Info del punto seleccionado */}
                    {selectedPoint && <InfoBox selectedPoint={selectedPoint} />}

                    {/* Título de sección */}
                    <section className="mt-20">
                        <h3 className="dark:text-white text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
                            📌 Todos los puntos de reciclaje
                        </h3>

                        {/* Lista de puntos */}
                        {points.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {points.map((point) => (
                                    <PointItem key={point.id} point={point} onCenterMap={handleMarkerClick} />
                                ))}
                            </div>
                        ) : (
                            cargando?
                            <p className="text-center text-sm text-slate-500 italic mt-8">
                                Cargando puntos...
                            </p>
                            :
                            <p className="text-center text-sm text-slate-500 italic mt-8">
                                No hay puntos disponibles actualmente.
                            </p>
                        )}
                    </section>
                </div>

            </div>
        </>
    )
}
