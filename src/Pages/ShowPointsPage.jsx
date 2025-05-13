import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map3 from "../Components/Map3";
import { FaRecycle, FaTrashAlt, FaFileAlt, FaGlassMartiniAlt, FaLeaf } from 'react-icons/fa';
import InfoBox from "../Components/Infobox";
import PointItem from "../Components/PointItem";

export default function ShowPointsPage() {
    const [points, setPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);

    // Obtener puntos de reciclaje
    async function getPoints() {
        const res = await fetch("/api/points");
        const data = await res.json();
        if (res.ok) {
            setPoints(data);
        }
    }

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
            <div className="py-10 ">

                <h1 className="text-3xl font-bold text-center mb-8">
                    ♻️ Puntos de Reciclaje
                </h1>

                <div id="mapa" className="mb-10 overflow-hidden border border-slate-200 shadow-[0_0_20px_3px_rgba(34,197,94,0.4)] transition-all duration-500">
                    <Map3 points={points} onMarkerClick={setSelectedPoint} />
                </div>

                <div className="max-w-7xl mx-auto">
                    {selectedPoint && (
                        <section className="mt-10 p-6 rounded-2xl border border-blue-200 bg-blue-50 shadow-md">
                            <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                                <span className="text-xl">📍</span> Detalles del Punto Seleccionado
                            </h2>
                            <ul className="text-sm text-blue-900 space-y-1">
                                <li><span className="font-medium">Latitud:</span> {selectedPoint.latitude}</li>
                                <li><span className="font-medium">Longitud:</span> {selectedPoint.longitude}</li>
                                <li><span className="font-medium">Usuario:</span> {selectedPoint.user.name}</li>
                            </ul>
                            <Link
                                to={`/points/${selectedPoint.id}`}
                                className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
                            >
                                Ver más detalles →
                            </Link>
                        </section>
                    )}


                    <section className="mt-16 px-4">
                        <h3 className="text-2xl font-bold text-center text-slate-700 mb-10">
                            📌 Todos los puntos de reciclaje
                        </h3>

                        {points.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {<InfoBox point={selectedPoint} />}
                                {points.length > 0 ? (
                                    points.map((point) => (
                                        <PointItem key={point.id} point={point} />
                                    ))
                                ) : (
                                    <p>No hay puntos</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-sm text-slate-500 italic mt-8">
                                No hay puntos disponibles actualmente.
                            </p>
                        )}
                    </section>

                </div>
            </div>

            <div className="flex justify-center py-10">
                <div className="border-t-2 border-b-[#577759] w-2/4"></div>
            </div>


        </>
    );
}
