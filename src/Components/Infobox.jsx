
import { Link } from "react-router-dom";

const InfoBox = ({ selectedPoint }) => {
    if (!selectedPoint) return null;

    return (
        <section className="p-6 max-w-7xl mx-auto sm:p-8 rounded-3xl border border-green-300 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl animate-fade-in">
            <h2 className="text-xl sm:text-3xl font-bold text-green-900 flex items-center gap-3 mb-6">
                <span>📍</span>
                Detalles del Punto <span className="text-xs sm:text-xl font-medium text-green-700">({selectedPoint.name})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-green-800 text-base">
                <div className="flex items-center gap-2">
                    <span className="text-[14px] sm:text-[18px] font-semibold">🏷 Tipo de punto:</span>
                    <span className="text-[14px] sm:text-[16px]">{selectedPoint.point_type}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-[14px] sm:text-[18px]  font-semibold">📍Dirección:</span>
                    <span className="text-[14px] sm:text-[16px]">{selectedPoint.address}</span>
                </div>

                <div className="flex items-center gap-2 sm:col-span-2">
                    <span className="text-[14px] sm:text-[18px] font-semibold">👤 Creador:</span>
                    <span className="text-[14px] sm:text-[16px]">{selectedPoint.user.name}</span>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Link
                    to={`/points/${selectedPoint.id}`}
                    className="inline-flex items-center gap-2 border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] text-sm  px-6 py-3 rounded-full shadow hover:shadow-lg transition duration-300"
                > 
                    VER MAS DETALLES →
                </Link>
            </div>
        </section>

    );

};

export default InfoBox;

