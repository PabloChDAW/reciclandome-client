"use client"

export default function NeumaticosPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header principal */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🛞</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 dark:text-green-400 mb-4">Neumáticos</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Neumáticos usados de vehículos</p>
        </div>

        {/* Contenido principal */}
        <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900 dark:to-gray-800 rounded-3xl p-8 shadow-2xl border border-green-200 dark:border-green-700">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Información básica */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 flex items-center gap-3">
                📋 ¿Qué incluye?
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Neumáticos de automóviles
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Neumáticos de motocicletas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Neumáticos de bicicletas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Neumáticos de camiones pequeños
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Cámaras de aire
                </li>
              </ul>
            </div>

            {/* Consejos */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 flex items-center gap-3">
                💡 Consejos importantes
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Lleva a puntos especializados
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Retira las llantas metálicas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Consulta con talleres mecánicos
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  No los quemes ni abandones
                </li>
              </ul>
            </div>
          </div>

          {/* Impacto ambiental */}
          <div className="mt-8 p-6 bg-green-100 dark:bg-green-800 rounded-2xl">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              🌍 Impacto ambiental
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Un neumático puede tardar hasta 600 años en descomponerse. Los neumáticos reciclados se usan para
              pavimentos, suelas de zapatos y combustible alternativo, evitando la acumulación en vertederos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
