import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map3 from "../Components/Map3";
import { FaRecycle, FaTrashAlt, FaFileAlt, FaGlassMartiniAlt, FaLeaf } from 'react-icons/fa';
import Slider from '../Components/SliderHome';
import Header from "../Components/Header";
import InfoBox from "../Components/Infobox";

export default function HomePage() {
  const sliderImages = ['/slider8.jpg', '/slider6.jpg', '/slider7.jpg'];

  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showHeader, setShowHeader] = useState(false);

  // Obtener puntos de reciclaje
  async function getPoints() {
    const res = await fetch("/api/points");
    const data = await res.json();
    if (res.ok) {
      setPoints(data);
    }
  }

  // Ejecutar al montar
  useEffect(() => {
    getPoints();

    const sliderHeight = document.getElementById("slider")?.offsetHeight || 740;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowHeader(scrollTop >= sliderHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Header que aparece al hacer scroll */}
      <div
        className={`fixed top-0 left-0 z-10 w-full transition-all duration-1000 ease-in-out ${showHeader ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 -translate-y-5 pointer-events-none'}`}
      >
      </div>

      {/* Slider principal */}
      <Slider images={sliderImages} interval={4000} />

      <div className="py-10 ">

        <h1 className="text-3xl font-bold text-center mb-8">
          ♻️ Puntos de Reciclaje
        </h1>

        <div className="mb-10 overflow-hidden border border-slate-200 shadow-[0_0_20px_3px_rgba(34,197,94,0.4)] transition-all duration-500">
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

          <InfoBox point={selectedPoint} />

          <section className="mt-16 px-4">
            <h3 className="text-2xl font-bold text-center text-slate-700 mb-10">
              📌 Todos los puntos de reciclaje
            </h3>

            {points.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {points.map((point) => (
                  <div
                    key={point.id}
                    className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow hover:shadow-lg transition duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                          #{point.id}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(point.created_at).toLocaleTimeString()}
                        </span>
                      </div>

                      <div className="text-sm text-slate-800 space-y-1">
                        <p>
                          <strong>Lat:</strong> {point.latitude}
                        </p>
                        <p>
                          <strong>Lng:</strong> {point.longitude}
                        </p>
                        <p className="text-xs text-slate-500 italic">
                          Creado por <span className="font-medium">{point.user.name}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Link
                        to={`/points/${point.id}`}
                        className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
                      >
                        Ver detalles →
                      </Link>
                    </div>
                  </div>
                ))}
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

      {/* Sección de tipos de reciclaje */}
      <div className="bg-[#577759] bg-opacity-5 py-20">
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-center pb-20 mx-auto">
            Tipos de algunos puntos de reciclaje que disponemos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center max-w-7xl mx-auto">
            {[
              {
                title: "Plásticos",
                text: "Envases, botellas, y otros residuos plásticos se reciclan para reducir la contaminación y darles una nueva vida.",
                icon: <FaRecycle size={40} className="text-green-800 mx-auto mb-2" />
              },
              {
                title: "Papel/Cartón",
                text: "Recicla periódicos, cajas, y folletos para evitar la tala innecesaria de árboles y conservar recursos naturales.",
                icon: <FaFileAlt size={40} className="text-green-800 mx-auto mb-2" />
              },
              {
                title: "Vidrio",
                text: "Botellas y frascos de vidrio pueden reciclarse indefinidamente sin perder calidad. ¡No los tires al cubo normal!",
                icon: <FaGlassMartiniAlt size={40} className="text-green-800 mx-auto mb-2" />
              },
              {
                title: "Metales",
                text: "Latas, envoltorios y objetos metálicos se funden para crear nuevos productos, ahorrando mucha energía.",
                icon: <FaTrashAlt size={40} className="text-green-800 mx-auto mb-2" />
              },
              {
                title: "Residuos Orgánicos",
                text: "Restos de comida y materia vegetal se transforman en compost, enriqueciendo el suelo de manera natural.",
                icon: <FaLeaf size={40} className="text-green-800 mx-auto mb-2" />
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md hover:scale-105 transition duration-700">
                <div className="mb-2">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center py-10">
        <div className="border-t-2 border-b-[#577759] w-2/4"></div>
      </div>

      {/* Sección de cómo funciona el mapa */}
      <div className="p-10 lg:py-20 lg:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold">
              ¿Cómo funciona nuestro mapa de reciclaje?
            </h1>
            <p className="text-sm sm:text-lg">
              En Reciclando.me te lo ponemos fácil para que sepas dónde reciclar cada cosa.
              Nuestra aplicación cuenta con un mapa interactivo que te permite:
            </p>

            <ul className="list-disc pl-6 text-sm sm:text-lg space-y-2">
              <li>Buscar tu ubicación para encontrar los puntos de reciclaje más cercanos.</li>
              <li>Filtrar por tipo de residuo: papel, vidrio, plásticos, electrónicos, ropa, pilas, y mucho más.</li>
              <li>Ver información detallada de cada punto de reciclaje: dirección, tipo de residuos aceptados, horarios, etc.</li>
              <li>Marcar favoritos o añadir nuevos puntos si conoces alguno que no aparece en el mapa.</li>
            </ul>

            <p className="text-sm sm:text-lg">
              Solo tienes que permitir que la web acceda a tu ubicación o escribir tu dirección,
              y el mapa te mostrará en segundos todos los puntos de reciclaje a tu alrededor.
            </p>
          </div>

          <div>
            <img
              src="/fondos_naturaleza2.jpg"
              alt="Mapa reciclaje"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
