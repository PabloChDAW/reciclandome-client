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
    name: "",
    address: "",
    city: "",
    region: "",
    country: "",
    postcode: "",
    way: "",
    place_type: "",
    point_type: "",
    url: "",
    description: "",
    phone: "", 
    email: ""  
  });

  const pointTypes = ["Tipo 1", "Tipo 2", "Tipo 3"];
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
  const [isGeocoding, setIsGeocoding] = useState(false);
  // --------------
  useEffect(() => { 
  }, [formData]);

  // Generar URL única
  const generateUrl = (name, lat, lng) => {
  lat = parseFloat(lat);
  lng = parseFloat(lng);
  const namePart = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const coordPart = `${lat.toFixed(5)}-${lng.toFixed(5)}`.replace(/\./g, '');
  return `${namePart}-${coordPart}`;
  };

  // Geocodificación inversa corregida
  useEffect(() => {
    const reverseGeocode = async () => {
      if (!formData.latitude || !formData.longitude) {
        return;
      } 
      
      setIsGeocoding(true);
      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${formData.longitude},${formData.latitude}.json?key=bmHH9ekzKdndbQ2GrZEm`
        );
        const data = await response.json();
        console.log("Respuesta de MapTiler:", data); // Para depuración

        if (data.features?.length > 0) {
          const feature = data.features[0];
          const properties = feature.properties || {};
          const context = feature.context || [];

          // Función mejorada para extraer valores del contexto
          const getContextValue = (type) => {
            const item = context.find(c => c.id && c.id.startsWith(`${type}.`));

            return item ? item.text : '';
          };

          // Extracción de datos específicos según la estructura de MapTiler
          const name = feature.text || properties.name || "Ubicación sin nombre";
          const address = feature.place_name || "";
          const city = getContextValue('municipality') || 
                      getContextValue('place') || 
                      getContextValue('locality');
          const region = getContextValue('region') || 
                        getContextValue('subregion');
          const country = getContextValue('country');
          const postcode = getContextValue('postal_code') || 
                          getContextValue('postcode');
          const way = properties.kind || 
                          feature.place_type?.[0] || 
                          properties.place_type_name?.[0] ||
                          "";
          const placeType = feature.place_type?.[0] || 
                          properties.type || 
                          properties.kind || "";

          setFormData(prev => ({
            ...prev,
            name,
            address,
            city,
            region,
            country,
            postcode,
            way,
            place_type: placeType,
            url: generateUrl(name, formData.latitude, formData.longitude)
          }));
        }
      } catch (error) {
        console.error("Error en geocodificación:", error);
      } finally {
        setIsGeocoding(false);
      }
    };

    reverseGeocode();
  }, [formData.latitude, formData.longitude]);

  async function handleCreate(e) {
    e.preventDefault();

    /* Petición de creación de point  */
    const res = await fetch("/api/points", {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      console.error("Error 422 - Datos de validación:", data);
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
      
      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-4">
        {/* Coordenadas editables */}
        <div>
          <input
            type="number"
            step="0.00001"
            placeholder="Latitud"
            value={formData.latitude || ""}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          />
          {errors.latitude && <p className="error">{errors.latitude[0]}</p>}
        </div>
  
        <div>
          <input
            type="number"
            step="0.00001"
            placeholder="Longitud"
            value={formData.longitude || ""}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          />
          {errors.longitude && <p className="error">{errors.longitude[0]}</p>}
        </div>

        <div>
          <select
            value={formData.point_type || ""}
            onChange={(e) => setFormData({ ...formData, point_type: e.target.value })}
          >
            <option value="">Selecciona un tipo de punto</option>
            {pointTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.point_type && <p className="error">{errors.point_type[0]}</p>}
        </div>

        {/* Campos de solo lectura */}
        <div className="info-box">
          <h3>Información del lugar</h3>
          <p><strong>Nombre:</strong> {formData.name || "—"}</p>
          <p><strong>Tipo de punto:</strong> {formData.point_type || "—"}</p> 
          <p><strong>Tipo de lugar:</strong> {formData.place_type || "—"}</p>
          <p><strong>Dirección:</strong> {formData.address || "—"}</p>
          <p><strong>Localidad:</strong> {formData.city || "—"}</p>
          <p><strong>Región:</strong> {formData.region || "—"}</p>
          <p><strong>País:</strong> {formData.country || "—"}</p>
          <p><strong>Código postal:</strong> {formData.postcode || "—"}</p>
          <p><strong>Categoría:</strong> {formData.way || "—"}</p>
        </div>
  
        {/* Input editable */}
        <div>
          <input
            type="text"
            placeholder="Descripción (opcional)"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Teléfono"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <button className="primary-btn" disabled={isGeocoding}>
          {isGeocoding ? "Cargando datos..." : "Crear punto"}
        </button>
      </form>
    </>
  );
}
