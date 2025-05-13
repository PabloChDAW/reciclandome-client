import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Map from "../../Components/Map";
export default function Show() {
  // console.log(useParams());
  const {id} = useParams();
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
        navigate("/");
      }
    }
  }

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <div className="py-20">
      {point ? (
        <div key={point.id} className="px-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Latitud:</p>
              <p className="text-lg font-semibold text-slate-800">{point.latitude}</p>
              <p className="text-sm text-slate-500">Longitud:</p>
              <p className="text-lg font-semibold text-slate-800">{point.longitude}</p>
              <p className="text-xs text-slate-500 mt-2 italic">
                Creado por <span className="font-medium">{point.user.name}</span> a las{" "}
                {new Date(point.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
  
          <div className="rounded-lg overflow-hidden mb-4">
            <Map latitud={point.latitude} longitud={point.longitude} />
          </div>
  
          {user && user.id === point.user_id && (
            <div className="flex items-center justify-end gap-3 mt-4">
              <Link
                to={`/points/update/${point.id}`}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md px-4 py-2 transition"
              >
                ✏️ Modificar
              </Link>
  
              <form onSubmit={handleDelete}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md px-4 py-2 transition"
                >
                  🗑 Eliminar
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-slate-600 font-semibold mt-10">
          Punto no encontrado.
        </p>
      )}
    </div>
  );
  
}
