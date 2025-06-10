"use client"

export default function AceitesPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header principal */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🛢️</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 dark:text-green-400 mb-4">Aceites</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aceites usados de cocina y aceites industriales
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
                  Aceite de cocina usado
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Aceite de fritura
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Aceites vegetales
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Aceites industriales
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Aceites de motor (en puntos especializados)
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
                  Filtra restos de comida
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Usa envases cerrados para transportar
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Deja enfriar antes de almacenar
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  Nunca lo viertas por el desagüe
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
              Un litro de aceite usado puede contaminar hasta 1000 litros de agua. El aceite reciclado puede convertirse
              en biodiesel, jabones y otros productos útiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
