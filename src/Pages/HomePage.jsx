import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map3 from "../Components/Map3";
import { FaRecycle, FaTrashAlt, FaFileAlt, FaGlassMartiniAlt, FaLeaf } from 'react-icons/fa';
import Slider from '../Components/SliderHome';

export default function HomePage() {
  const sliderImages = ['/slider8.jpg', '/slider6.jpg', '/slider7.jpg'];
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showHeader, setShowHeader] = useState(false);

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

  useEffect(() => {
    if (location.state?.scrollToMapa) {
      const mapaSection = document.getElementById("mapa");
      if (mapaSection) {
        setTimeout(() => {
          mapaSection.scrollIntoView({ behavior: "smooth" });
        }, 100); // espera breve para que el DOM se monte
      }
    }
  }, [location]);

  // Obtener puntos de reciclaje
  async function getPoints() {
    const res = await fetch("/api/points");
    const data = await res.json();
    console.log("hola")
    console.log(data);

    if (res.ok) {
      setPoints(data);
    }
  }

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

        <h1 className="pt-10 text-3xl font-bold text-center mb-8">
          ♻️ Puntos de Reciclaje
        </h1>

        <div id="mapa" className="overflow-hidden border border-slate-200 shadow-[0_0_20px_3px_rgba(34,197,94,0.4)] transition-all duration-500">
          <Map3 points={points} onMarkerClick={setSelectedPoint} />
        </div>

        <div className="py-10 max-w-7xl mx-auto">
          {selectedPoint && (
            <section className="mt-10 p-6 sm:p-8 rounded-3xl border border-green-300 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl animate-fade-in">
              <h2 className="text-3xl font-bold text-green-900 flex items-center gap-3 mb-6">
                <span className="text-2xl">📍</span>
                Detalles del Punto Seleccionado
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-green-800 text-base">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">🌐 Latitud:</span>
                  {selectedPoint.latitude}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">🧭 Longitud:</span>
                  {selectedPoint.longitude}
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <span className="font-semibold">👤 Usuario:</span>
                  {selectedPoint.user.name}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={`/points/${selectedPoint.id}`}
                  className="inline-flex items-center gap-2 border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] text-sm px-6 py-3 rounded-xl shadow hover:shadow-lg transition duration-300"
                >
                  VER MÁS DETALLES →
                </Link>
              </div>
            </section>
          )}
        </div>
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
