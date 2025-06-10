"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../Context/AppContext"
import Swal from "sweetalert2"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

function getTypeRoute(typeName) {
  const routeMap = {
    'Plásticos': 'plasticos',
    'Vidrios': 'vidrios',
    'Aceites': 'aceites',
    'Orgánica': 'organica',
    'Electrónicos': 'electronicos',
    'Textiles': 'textiles',
    'Neumáticos': 'neumaticos',
    'Chatarra': 'chatarra',
    'Construcción': 'construccion'
  };
  
  return routeMap[typeName] || typeName.toLowerCase();
}

export default function PointItemProfile({ point, handleDeletePoint }) {
  const { user, token } = useContext(AppContext)
  const navigate = useNavigate()

  async function handleDelete(e) {
    e.preventDefault()

    if (user && user.id === point.user_id) {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#166534",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })

      if (!result.isConfirmed) return

      const res = await fetch(`https://reciclandome-api-main-laravelcloud-4b3jba.laravel.cloud/api/points/${point.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (res.ok) {
        toastr.success("Punto eliminado correctamente.")
        if (handleDeletePoint) {
          handleDeletePoint(point.id)
        }
      } else {
        toastr.error("Ocurrió un error al intentar eliminar el punto.")
      }
    }
  }

  return (
    <div className="p-3 w-full rounded-lg border border-green-200 bg-white hover:bg-green-50 transition-colors duration-200">
      <div className="flex items-center justify-between gap-3">
        {/* Información del punto */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-green-900 truncate">{point.name}</h3>

          {/* Tipos de reciclaje */}
            {point.types && point.types.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1 mb-2">
                {point.types.slice(0, 3).map((type) => (
                <Link
                    key={type.id}
                    to={`/tipos/${getTypeRoute(type.name)}`}
                    className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full hover:bg-green-200 transition-colors duration-200"
                >
                    {type.name}
                </Link>
                ))}
                {point.types.length > 3 && (
                <span className="text-green-600 text-xs px-2 py-0.5">+{point.types.length - 3} más</span>
                )}
            </div>
            )}

          <p className="text-sm text-gray-600 truncate">📍 {point.address}</p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-2">
          <Link
            to={`/points/${point.id}`}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Ver detalles
          </Link>

          {user && user.id === point.user_id && (
            <>
              <Link
                to={`/points/update/${point.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                ✏️ Editar
              </Link>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                🗑️ Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
