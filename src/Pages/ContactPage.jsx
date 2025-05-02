import React from "react";

export default function ContactForm() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white mb-20 md:mb-0 ">
            <div className="p-10 sm:py-10 sm:max-w-7xl mx-auto grid md:grid-cols-2 max-w-6xl w-full">
                <div>
                    <h2 className="text-2xl md:text-5xl  text-black mb-2">¿Tienes alguna duda?</h2>
                    <h3 className="text-2xl md:text-5xl  text-black mb-6">¡ESCRÍBENOS!</h3>
                    <p className="text-gray-600 max-w-md">
                        Le atenderemos lo más rápido posible y resolveremos todas sus preguntas
                    </p>
                </div>

                <form className="space-y-4 m-10 md:m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-md md:text-lg font-medium text-black">Nombre</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-b border-black focus:outline-none text-green-950"
                            />
                        </div>
                        <div>
                            <label className="block text-md md:text-lg font-medium text-black">Correo Electrónico</label>
                            <input
                                type="email"
                                className="mt-1 block w-full border-b border-black focus:outline-none text-green-950" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-md md:text-lg font-medium text-black">Teléfono</label>
                            <input
                                type="tel"
                                className="mt-1 block w-full border-b border-black focus:outline-none text-green-950"
                            />
                        </div>
                        <div>
                            <label className="block text-md md:text-lg font-medium text-black">Sugerencias</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-b border-black focus:outline-none text-green-950"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-md md:text-lg font-medium text-black">
                            ¿Cómo podemos ayudarle?
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-b border-black focus:outline-none text-green-950"
                        />
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="checkbox"
                            className="accent-green-950"
                            id="privacy"
                        />
                        <label htmlFor="privacy" className="text-md md:text-lg text-green-950">
                            Acepto y he leído la Política de privacidad
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#131700] text-white px-6 py-2 mt-4 md:font-semibold shadow-md hover:bg-green-950"
                    >
                        ➤ ENVIAR
                    </button>
                </form>
            </div>
        </div>
    );
}
