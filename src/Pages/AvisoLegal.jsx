export default function AvisoLegal() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Aviso Legal</h1>
      <p className="mb-4 dark:text-white">
        Este sitio web es propiedad de [Nombre de tu empresa], con NIF [NIF] y
        domicilio en [Dirección]. El uso de esta web está sujeto a las
        condiciones que se indican a continuación.
      </p>

      <h2 className="font-semibold text-lg mt-6 mb-2 dark:text-white">Responsabilidad</h2>
      <p className="dark:text-white">
        El titular no se hace responsable del mal uso de los contenidos de este
        sitio web.
      </p>

      <h2 className="font-semibold text-lg mt-6 mb-2 dark:text-white">Propiedad Intelectual</h2>
      <p className="dark:text-white">
        Todos los contenidos de esta web (textos, imágenes, logotipos) son
        propiedad de [Nombre] o de terceros con autorización.
      </p>

      <h2 className="font-semibold text-lg mt-6 mb-2 dark:text-white">Legislación aplicable</h2>
      <p className="dark:text-white">Este aviso legal se rige por la legislación española.</p>
    </div>
  );
}
