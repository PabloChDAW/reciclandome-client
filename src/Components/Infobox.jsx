
import { Link } from "react-router-dom";

function getTypeRoute(typeName) {
  const routeMap = {
    'Plásticos': 'plasticos',
    'Vidrios': 'vidrios',
    'Aceites': 'aceites',
    'Orgánica': 'organica',
    'Electrónicos': 'electronicos',
    'Textiles': 'textiles',
    'Neumáticos': 'neumaticos',
    'Chatarra': 'chatarra',
    'Construcción': 'construccion'
  };
  
  return routeMap[typeName] || typeName.toLowerCase();
}

const InfoBox = ({ selectedPoint }) => {
    if (!selectedPoint) return null;

    return (
        <section className="mt-10 p-6 sm:p-8 rounded-3xl border border-green-300 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 flex items-center gap-3 mb-6">
            <span className="text-2xl">📍</span>
            Detalles del Punto Seleccionado
            </h2>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-green-900 text-base font-me  dium leading-relaxed">
                <p><span className="font-bold">👤 Usuario:{selectedPoint.user.name}</span></p>
                
                <p>
                    <span className="font-bold">🏷 Tipos de residuos:</span>{" "}
                    {selectedPoint.types && selectedPoint.types.length > 0 ? (
                        selectedPoint.types.map(type => (
                        <Link
                            key={type.id}
                            to={`/tipos/${getTypeRoute(type.name)}`}
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full hover:bg-green-200 transition-colors duration-200 inline-block"
                        >
                            {type.name}
                        </Link>
                        ))
                    ) : (
                        <span className="text-gray-500 text-xs">No especificado</span>
                    )}
                </p>
                <p><span className="font-bold">📌Dirección: {selectedPoint.address}</span></p>
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

    );

};

export default InfoBox;

