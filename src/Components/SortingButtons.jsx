"use client"

export default function SortingButtons({ currentSort, currentDirection, onSortChange }) {
  // Solo los 3 criterios solicitados
  const sortOptions = [
    { key: "created_at", label: "Fecha", icon: "📅" },
    { key: "name", label: "Nombre", icon: "🔤" },
    { key: "types", label: "Tipos", icon: "🏷️" },
  ]

  const handleSortClick = (sortKey) => {
    if (currentSort === sortKey) {
      // Si ya está ordenado por este campo, cambiar dirección
      const newDirection = currentDirection === "asc" ? "desc" : "asc"
      onSortChange(sortKey, newDirection)
    } else {
      // Si es un campo nuevo, empezar con 'asc'
      onSortChange(sortKey, "asc")
    }
  }

  const getArrowIcon = (sortKey) => {
    if (currentSort !== sortKey) return "↕️"
    return currentDirection === "asc" ? "⬆️" : "⬇️"
  }

  return (
    <div className="bg-white dark:bg-[#344735] p-4 rounded-lg shadow-md mb-6">
      <h3 className="dark:text-white text-lg font-semibold mb-4">Ordenar por:</h3>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => handleSortClick(option.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              currentSort === option.key
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{option.icon}</span>
            <span className="text-sm font-medium">{option.label}</span>
            <span className="text-xs">{getArrowIcon(option.key)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}