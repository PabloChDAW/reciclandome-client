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

      {/* Sección de bienvenida */}
      <div className="p-10 sm:py-20 sm:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <img src="/slider1.jpg" alt="Reciclaje" className="w-full h-auto rounded-2xl shadow-lg" />
          </div>
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-4xl font-bold">Transforma tu mundo, empieza reciclando.</h1>
            <p className="text-sm sm:text-lg">
              En Reciclando.me creemos que cada acción cuenta. Este espacio fue creado para ayudarte
              a entender qué, cómo y dónde reciclar, además de conectar con iniciativas
              locales y sostenibles. ¡Haz comunidad y transforma tu entorno!
            </p>
          </div>
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
