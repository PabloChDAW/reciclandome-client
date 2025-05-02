import { useState, useEffect } from 'react';
//import HeaderHome from './HeaderHome';

export default function Slider({ images = [], interval = 4000 }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length < 2) return;
        const id = setInterval(() => {
            setCurrent((idx) => (idx + 1) % images.length);
        }, interval);
        return () => clearInterval(id);
    }, [images.length, interval]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Capa oscura opcional para contraste */}
            <div className="absolute inset-0 bg-white/60 z-10" />

            {/* Header fijo encima del slider */}
            <div className="absolute top-0 left-0 w-full z-30">
            </div>

            {/* Imágenes del slider */}
            {images.map((src, idx) => (
                <img
                    key={idx}
                    src={src}
                    alt={`slide-${idx}`}
                    className={`
                        absolute inset-0 w-full h-full object-cover
                        transition-opacity duration-1000
                        ${idx === current ? 'opacity-100' : 'opacity-0'}
                    `}
                />
            ))}

            {/* Texto centrado */}
            <div className="absolute inset-0 mt-20 flex flex-col items-center justify-center text-center z-20">
                <h1 className="text-4xl lg:text-6xl  md:text-6xl font-bold text-[#131700] drop-shadow-lg">
                    Reciclando.me
                </h1>
                <p className="p-10 text-xs lg:text-lg md:text-lg text-[#131700] font-medium max-w-2xl drop-shadow-md">
                    Encuentra puntos limpios, aprende a separar residuos y haz tu ciudad más sostenible con <span className="text-[#166534] font-bold">Reciclando.me</span>.
                    <br />
                    <span
                        className="inline-block mt-3 px-4 py-2 bg-green-200 text-[#166534] rounded-full font-semibold hover:bg-green-300 hover:scale-105 transition-all duration-700 cursor-pointer"
                        onClick={() => {/* lógica de navegación o scroll al mapa */ }}
                    >
                        Explora el Mapa Interactivo 🗺️
                    </span>
                </p>
            </div>

            {/* Puntos de navegación */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`
                            w-3 h-3 rounded-full
                            ${idx === current ? 'bg-white' : 'bg-white/50'}
                        `}
                    />
                ))}
            </div>
        </div>
    );
}
