import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const {id} = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [errors, setErrors] = useState({});

  async function getPoint() {
    /* Petición de datos de un point. */
    const res = await fetch(`/api/points/${id}`);
    const data = await res.json();

    // console.log(data);

    if (res.ok) {
      if (data.point.user_id !== user.id) {
        navigate("/");
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
    console.log(data);
  }

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <>
      <h1 className="title">Modificar tu punto</h1>
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
