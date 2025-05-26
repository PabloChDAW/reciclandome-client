export default function PoliticaCookies() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Política de Cookies</h1>
      <p className="mb-4 dark:text-white">
        Este sitio web utiliza cookies para garantizar una mejor experiencia de
        usuario. Al continuar navegando, aceptas el uso de cookies.
      </p>

      <h2 className="font-semibold text-lg mt-6 mb-2 dark:text-white">¿Qué son las cookies?</h2>
      <p className="dark:text-white">
        Son pequeños archivos de texto que los sitios web almacenan en tu
        dispositivo cuando los visitas.
      </p>

      <h2 className="font-semibold text-lg mt-6 mb-2 dark:text-white">
        Tipos de cookies que utilizamos
      </h2>
      <ul className="list-disc list-inside">
        <li className="dark:text-white">Cookies técnicas y necesarias</li>
        <li className="dark:text-white">Cookies de análisis</li>
        <li className="dark:text-white">Cookies de publicidad</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6 mb-2 dark:text-white">
        ¿Cómo desactivar las cookies?
      </h2>
      <p className="dark:text-white">
        Puedes configurar tu navegador para rechazar o eliminar cookies.
        Consulta la ayuda de tu navegador para más detalles.
      </p>
    </div>
  );
}
