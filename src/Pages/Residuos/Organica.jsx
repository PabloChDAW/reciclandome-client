"use client"

export default function OrganicaPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header principal */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🥬</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 dark:text-green-400 mb-4">Orgánica</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Residuos orgánicos, restos de comida y material biodegradable
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
                  Restos de frutas y verduras
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Cáscaras de huevo
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Posos de café y té
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Hojas y restos de jardín
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  Papel y cartón sin tinta
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
                  Mezcla materiales secos y húmedos
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Corta en trozos pequeños
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  Mantén aireado el compost
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  Evita carnes y lácteos
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
              Los residuos orgánicos representan el 40% de la basura doméstica. El compostaje reduce las emisiones de
              metano y produce abono natural rico en nutrientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
