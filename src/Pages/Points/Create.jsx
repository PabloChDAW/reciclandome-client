import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Map2 from "../../Components/Map2";

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    latitude: 40.4168,
    longitude: -3.7038,
    city: "prueba",
    address: "pepito",
    telephone: "957404040",
    email: "pepe@gmail.com",
    url: "https://chatgpt.com/",
  });

  const ε = 0.001;
  const safeLat = formData.latitude === 0 ? ε : parseFloat(formData.latitude);
  const safeLng = formData.longitude === 0 ? ε : parseFloat(formData.longitude);

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    const res = await fetch("/api/points", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanedData),
    });

    const data = await res.json();
    console.log("Respuesta del servidor:", data);

    if (!res.ok) {
      setErrors(data.errors || { general: ["Error desconocido"] });
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <h1 className="title">Crear un nuevo punto</h1>
      <Map2 latitud={safeLat} longitud={safeLng} setFormData={setFormData} />
      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="number"
            step="0.00001"
            placeholder="Latitud"
            value={formData.latitude}
            onChange={(e) =>
              setFormData({ ...formData, latitude: e.target.value })
            }
          />
          {errors.latitude && <p className="error">{errors.latitude[0]}</p>}
        </div>

        <div>
          <input
            type="number"
            step="0.00001"
            placeholder="Longitud"
            value={formData.longitude}
            onChange={(e) =>
              setFormData({ ...formData, longitude: e.target.value })
            }
          />
          {errors.longitude && <p className="error">{errors.longitude[0]}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Ciudad"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Dirección"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Teléfono"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <input
            type="url"
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>

        {errors.general && <p className="error">{errors.general[0]}</p>}

        <button className="primary-btn">Crear</button>
      </form>
    </>
  );
}
