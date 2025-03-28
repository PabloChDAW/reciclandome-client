import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

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

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <>
      {point ? (
        <div key={point.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p>{point.latitude}</p>
              <p>{point.longitude}</p>
              <small className="text-xs text-slate-600">
                Creado por {point.user.name} a las{" "} {new Date(point.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>

          {user && user.id === point.user_id && <div className="flex items-center justify-end gap-4">
          <Link
            to={`/points/update/${point.id}`}
            className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
          >
            Modificar
          </Link>
          </div>}
        </div>
      ) : (
        <p className="title">Punto no encontrado.</p>
      )}
    </>
  );
}
