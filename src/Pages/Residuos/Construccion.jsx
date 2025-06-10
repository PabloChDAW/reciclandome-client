"use client"

export default function ConstruccionPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header principal */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🧱</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 dark:text-green-400 mb-4">Construcción</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Escombros, materiales de construcción y demolición
          </p>
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
                  Ladrillos y bloques
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Hormigón y cemento
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Azulejos y cerámicas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Madera de construcción
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Yeso y escayola
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
                  Separa por tipo de material
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Limpia de clavos y metales
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Contacta gestores autorizados
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  No mezcles con materiales peligrosos
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
              Los residuos de construcción representan el 40% de todos los residuos sólidos. Su reciclaje puede producir
              áridos reciclados para nuevas construcciones, reduciendo la extracción de materias primas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
