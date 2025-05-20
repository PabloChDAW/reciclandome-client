import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Map from "../../Components/Map";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function Show() {
  // console.log(useParams());
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);
  const [point, setPoint] = useState(null);

  async function getPoint() {
    /* Petición de datos de un post. */
    const res = await fetch(`/api/points/${id}`);
    const data = await res.json();

    // console.log(data);

    if (res.ok) {
      setPoint(data.point);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id === point.user_id) {
      /* Petición de borrado de un post. */
      const res = await fetch(`/api/points/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toastr.success("Punto eliminado correctamente.");
        setTimeout(() => navigate("/"), 2000); // Espera un poco antes de redirigir
      } else {
        toastr.error("Ocurrió un error al intentar eliminar el punto.");
      }
    }
  }

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <div className="mx-auto">

      {point ? (
        <>
          {/* Mapa principal con borde y sombra suave */}
          <div>
            <Map className="h-[650px]" latitud={point.latitude} longitud={point.longitude} />
          </div>

          {/* Información del punto con fondo suave y bordes redondeados */}
          <section className="mt-10 max-w-7xl mx-auto bg-green-50 rounded-2xl p-8 shadow-md">
            <h2 className="text-xl sm:text-3xl font-extrabold text-green-800 flex items-center gap-3 mb-6">
              ♻️ Detalles del Punto Reciclaje
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-900 text-base font-medium leading-relaxed">
              <p><span className="font-bold">📍 Coordenadas:</span> {point.latitude}, {point.longitude}</p>
              <p><span className="font-bold">📞 Teléfono:</span> {point.phone}</p>
              <p><span className="font-bold">✉️ Correo:</span> {point.email}</p>
              <p><span className="font-bold">🔖 Tipo de Punto:</span> {point.point_type}</p>
              <p><span className="font-bold">🏠 Tipo de Lugar:</span> {point.place_type}</p>
              <p><span className="font-bold">📫 Dirección:</span> {point.address}</p>
              <p><span className="font-bold">🛤️ Vía:</span> {point.way}</p>
              <p className="md:col-span-2"><span className="font-bold">📝 Descripción:</span> {point.description}</p>
            </div>

            <p className="mt-8 text-sm italic text-green-700 text-right">
              Creado por <span className="font-semibold">{point.user.name}</span> a las {new Date(point.created_at).toLocaleTimeString()}
            </p>
            {/* Botones de acción con estilo natural y accesible */}
          {user && user.id === point.user_id && (
            <div className="flex flex-col max-w-7xl mx-auto sm:flex-row justify-end gap-4 my-10">
              <Link
                to={`/points/update/${point.id}`}
                className="relative flex items-center justify-center w-full sm:w-[150px] border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] rounded-full shadow-lg py-3 px-5 text-sm transition-all duration-300"
              >
                ✏️ MODIFICAR
              </Link>
              <form onSubmit={handleDelete} className="w-full sm:w-auto">
                <button
                  type="submit"
                  className="relative flex items-center justify-center w-full sm:w-[150px] border border-red-500 bg-red-600 hover:bg-white text-white hover:text-red-600 rounded-full shadow-lg py-3 px-5 text-sm transition-all duration-300"
                >
                  🗑 ELIMINAR
                </button>
              </form>
            </div>

          )}
          </section>

          
        </>
      ) : (
        <p className="text-center text-lg font-semibold text-green-900 mt-16">
          Punto no encontrado.
        </p>
      )}
    </div>
  );


}
