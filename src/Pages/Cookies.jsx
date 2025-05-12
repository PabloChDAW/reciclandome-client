// src/pages/PoliticaCookies.jsx
export default function PoliticaCookies() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">Política de Cookies</h1>
            <p className="mb-4">
                Este sitio web utiliza cookies para garantizar una mejor experiencia de usuario. Al continuar navegando, aceptas el uso de cookies.
            </p>

            <h2 className="font-semibold text-lg mt-6 mb-2">¿Qué son las cookies?</h2>
            <p>Son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas.</p>

            <h2 className="font-semibold text-lg mt-6 mb-2">Tipos de cookies que utilizamos</h2>
            <ul className="list-disc list-inside">
                <li>Cookies técnicas y necesarias</li>
                <li>Cookies de análisis</li>
                <li>Cookies de publicidad</li>
            </ul>

            <h2 className="font-semibold text-lg mt-6 mb-2">¿Cómo desactivar las cookies?</h2>
            <p>Puedes configurar tu navegador para rechazar o eliminar cookies. Consulta la ayuda de tu navegador para más detalles.</p>
        </div>
    );
}
