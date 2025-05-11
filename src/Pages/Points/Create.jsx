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

    // Seguridad y sanitización ---- //MapTyler no gestiona bien la iniciación en alguna coordenada 0.
  // Estas líneas evitan que un tercero pueda denegarnos el servicio si consigue forzar la aplicación a iniciar
  // Con valores válidos pero que MapTyler no puede gestionar (longitud o latitud 0)
  // De hecho además en este apartado la aplicación no fallaría si este mapa se iniciara en 0,0 por cualquier casuistica en 
  // un futuro. Por ejemplo: Personalización del usuario de perfil, que el usuario esté en null Island y se recoja su 
  // ubicación, etc.
  
  const ε = 0.001;
  const safeLat = formData.latitude === 0 ? ε : parseFloat(formData.latitude);
  const safeLng = formData.longitude === 0 ? ε : parseFloat(formData.longitude);
  // --------------
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
      <Map2 latitud={safeLat} longitud={safeLng} setFormData={setFormData}></Map2>
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
