import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Map2 from "../../Components/Map2";

export default function Create() {
  const navigate = useNavigate();
  const {token} = useContext(AppContext);
  const [formData, setFormData] = useState({
    latitude: 40.4168,
    longitude: -3.7038,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    
  }, [formData]);

  async function handleCreate(e) {
    e.preventDefault();

    /* Petición de creación de point  */
    const res = await fetch("/api/points", {
      method: 'post',
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
    // console.log(data);
  }

  return (
    <>
      <h1 className="title">Crear un nuevo punto</h1>
      <Map2 latitud={formData.latitude} longitud={formData.longitude} setFormData={setFormData}></Map2>
      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
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
        <button className="primary-btn">Crear</button>
      </form>
    </>
  )
}
