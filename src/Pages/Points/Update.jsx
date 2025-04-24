import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import Map2 from "../../Components/Map2";

export default function Update() {
  const {id} = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    latitude: 40.4168,
    longitude: -3.7038,
  });

  // Seguridad y sanitización ---- //MapTyler no gestiona bien la iniciación en alguna coordenada 0.
  // Estas líneas evitan que un tercero pueda denegarnos el servicio si consigue forzar la aplicación a iniciar
  // Con valores válidos pero que MapTyler no puede gestionar (longitud o latitud 0)
  const ε = 0.001;
  const safeLat = formData.latitude === 0 ? ε : parseFloat(formData.latitude);
  const safeLng = formData.longitude === 0 ? ε : parseFloat(formData.longitude);
  // --------------

  const [errors, setErrors] = useState({});
  async function getPoint() {
    /* Petición de datos de un point. */
    const res = await fetch(`/api/points/${id}`);
    const data = await res.json();

    // console.log(data);

    if (res.ok) {
      if (data.point.user_id !== user.id) {
        navigate("/"); //Redirección a home en caso de que la id del usuario logueado y la 
        // id del usuario a la que pertenece el punto no sean coincidentes. De esta manera los usuarios 
        // no tendrán oportunidad ni si quiera de acceder a realizar acciones para las que no tienen permisos
        // (en este caso actualizar el punto)
      }

      setFormData({
        latitude: data.point.latitude,
        longitude: data.point.longitude,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    /* Petición de creación de post  */
    const res = await fetch(`/api/points/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }

    // console.log(formData);
  }

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <>
      <h1 className="title">Modificar tu punto</h1>
      <Map2 latitud={safeLat} longitud={safeLng} setFormData={setFormData}></Map2>
      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="number"
            step="0.00001"
            placeholder="Latitud"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          />
          {errors.latitude && <p className="error">{errors.latitude[0]}</p>}
        </div>

        <div>
          <input
            type="number"
            step="0.00001"
            placeholder="Longitud"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          />
          {errors.longitude && <p className="error">{errors.longitude[0]}</p>}
        </div>
        <button className="primary-btn">Actualizar</button>
      </form>
    </>
  );
}
