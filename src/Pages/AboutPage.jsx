// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
    return (
        /*POR QUÉ ELEGIRNOS*/
        <>
            <div className="flex flex-col md:flex-row items-center justify-center p-10 sm:py-10 sm:max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="rounded-lg overflow-hidden">
                        <img
                            src="/fondo_about.png"
                            alt="Reciclaje"
                            className="w-full max-w-sm object-cover"
                        />
                    </div>
                    <div className="sm:p-6 rounded-lg max-w-xl ">
                        <h2 className="text-2xl sm:text-4xl font-bold text-green-800 mb-4">¿Por qué elegirnos?</h2>
                        <p className="text-sm sm:text-lg mb-3">
                            En Reciclando.me creemos que un pequeño cambio puede generar un gran impacto.
                        </p>
                        <p className="text-sm sm:text-lg mb-3">
                            Nacimos con la idea de facilitar el acceso a la información sobre reciclaje, conectando a personas, barrios y comunidades que quieren hacer las cosas mejor por el planeta.
                        </p>
                        <p className="text-sm sm:text-lg mb-3">
                            Somos un equipo de personas comprometidas con el medio ambiente, la educación y la tecnología.
                        </p>
                        <p className="text-sm sm:text-lg">
                            Creamos esta plataforma para que cualquiera pueda encontrar fácilmente puntos limpios cerca, compartir nuevos lugares y aprender a reciclar de forma responsable.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="border-t-2 border-b-[#577759] w-2/4 mb-10"></div>
            </div>

            <div className="bg-[#577759] bg-opacity-5 py-16 md:px-12 items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-center p-10 sm:py-10 sm:max-w-7xl mx-auto pb-16">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="sm:p-6 rounded-lg max-w-xl ">
                            <h2 className="text-2xl sm:text-4xl font-bold mb-4 ">¿Qué nos mueve?</h2>
                            <ul className="list-disc list-inside space-y-2 ">
                                <li>La urgencia de actuar frente a la crisis climática</li>
                                <li>La confianza en la educación como motor de cambio</li>
                                <li>La tecnología como herramienta para simplificar lo importante</li>
                                <li>La comunidad como fuerza para lograr cosas grandes</li>
                            </ul>

                            <h2 className="text-2xl sm:text-4xl font-bold mt-10 mb-4 ">¿Cómo funciona?</h2>
                            <p className="text-sm sm:text-lg mb-4">
                                En Reciclando.me hacemos que reciclar sea más fácil, accesible y colaborativo. Así es como puedes usar nuestra plataforma:
                            </p>
                            <ul className="text-sm sm:text-lg space-y-1 ">
                                <li>1. 🔍 Explora el mapa</li>
                                <li>2. 📍 Agrega nuevos puntos</li>
                                <li>3. 🛠️ Reporta o actualiza información</li>
                                <li>4. 💛 Súmate a la comunidad</li>
                            </ul>

                            <h2 className="text-2xl sm:text-4xl font-bold mt-10 mb-4 ">¿Y tú?</h2>
                            <p>
                                Tú también puedes ser parte. Ya sea usando el mapa, compartiendo información o creando nuevos puntos limpios, tu participación hace la diferencia. <br />
                                <br />
                                <strong>"Juntos reciclamos mejor. Juntos nos reciclamos."</strong>
                            </p>
                        </div>
                        {/* Imagen sticky */}
                        <div className="hidden md:block flex-shrink-0 max-w-md sticky top-52 self-start">
                            <img
                                src="slider7.jpg"
                                alt="Bosque con rayos de luz"
                                className="rounded-xl w-full shadow"
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex justify-center py-10">
                <div className="border-t-2 border-b-[#577759] w-2/4"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center p-10 sm:py-10 sm:max-w-7xl mx-auto pb-16">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="rounded-lg overflow-hidden order-1">
                        <img
                            src="/fondo_about.png"
                            alt="Reciclaje"
                            className="w-full max-w-sm object-cover"
                        />
                    </div>
                    <div className="sm:p-6 rounded-lg max-w-xl order-2">
                        <h2 className="text-2xl sm:text-4xl font-bold text-green-800 mb-4">Nuestra Experiencia</h2>
                        <p className="text-sm sm:text-lg mb-3">
                            En Reciclando.me usamos la tecnología y la acción colectiva para transformar hábitos.
                        </p>
                        <p className="text-sm sm:text-lg mb-3">
                            Ya logramos más de 100 puntos limpios, una comunidad activa y alianzas con educadores.
                        </p>
                        <p className="text-sm sm:text-lg mb-3">
                            Desarrollamos herramientas para hacer el reciclaje más fácil y accesible.
                        </p>
                        <p className="text-sm sm:text-lg">
                            Porque reciclar es conectar, cuidar y construir juntos. Cada acción cuenta.
                        </p>
                    </div>
                </div>
            </div>


        </>
    );
}
