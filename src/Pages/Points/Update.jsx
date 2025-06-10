import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import Map2 from "../../Components/Map2";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { translateToSpanish } from '../../Utils/translations';

export default function Update() {
  const {id} = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
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
    types: [],
    url: "",
    description: "",
    phone: "", 
    email: ""
  });
  const [allTypes, setAllTypes] = useState([]);

useEffect(() => {
  fetch('/api/types')
    .then(res => res.json())
    .then(setAllTypes);
}, []);
  // Seguridad y sanitización ---- //MapTyler no gestiona bien la iniciación en alguna coordenada 0.
  // Estas líneas evitan que un tercero pueda denegarnos el servicio si consigue forzar la aplicación a iniciar
  // Con valores válidos pero que MapTyler no puede gestionar (longitud o latitud 0)
  const ε = 0.001;
  const safeLat = formData.latitude === 0 ? ε : parseFloat(formData.latitude);
  const safeLng = formData.longitude === 0 ? ε : parseFloat(formData.longitude);
  // --------------

  const [errors, setErrors] = useState({});
  const [isGeocoding, setIsGeocoding] = useState(false);

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
      if (!formData.latitude || !formData.longitude) return;
     
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

  async function getPoint() {
    /* Petición de datos de un point. */
    const res = await fetch(`/api/points/${id}`);
    const data = await res.json();

    if (res.ok) {
      if (data.point.user_id !== user.id) {
        navigate("/"); //Redirección a home en caso de que la id del usuario logueado y la 
        // id del usuario a la que pertenece el punto no sean coincidentes sin darles oportunidad
        // a acceder al sitio
        toastr.error('No tienes permiso para actualizar este punto.', 'Acceso Denegado');
        //toastr.error(data.errors, 'Andá a modificar la URL a otro lado, boludo. No robes los puntos chtm');
      }

      setFormData({
        latitude: data.point.latitude,
        longitude: data.point.longitude,
        name: data.point.name || "",
        address: data.point.address || "",
        city: data.point.city || "",
        region: data.point.region || "",
        country: data.point.country || "",
        postcode: data.point.postcode || "",
        way: data.point.way || "",
        place_type: data.point.place_type || "",
        types: data.point.types?.map(t => t.id) || [],
        url: data.point.url || "",
        description: data.point.description || "",
        phone: data.point.phone || "", 
        email: data.point.email || ""
      });
    }
    else{
      let errorMessage;
      let errorTitle;
      if (res.status === 404) {
          errorMessage = 'El punto que buscas no existe.';
          errorTitle = 'Punto No Encontrado';
      }
      else if (res.status >= 500) {
          errorMessage = 'Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde o avisa a un administrador';
          errorTitle = 'Error del Servidor';
      } else {
          errorMessage = 'Error del cliente desconocido, por favor ponte en contacto con un administrador';
          errorTitle = 'Error del Cliente';
      }
      toastr.error(errorMessage, errorTitle);
      navigate("/");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    /* Petición de actualización de point */
    const res = await fetch(`/api/points/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        point_ids: formData.types // este es el nuevo campo esperado por el backend
      }),
    });

    const data = await res.json();

    if (data.errors) {
    console.error("Error 422 - Datos de validación:", data);
    setErrors(data.errors);
    toastr.error("Error al actualizar el punto. Verifica los datos ingresados.");
  } else {
    toastr.success("Punto actualizado correctamente.");
    setTimeout(() => navigate("/"), 2000); // Espera 2s para que se vea el mensaje
  }
  }

  useEffect(() => {
    getPoint();
  }, []);

  return (
  <div className="py-20">
    <h1 className="dark:text-white text-3xl font-bold mb-8 text-center">
      🔄 Modificar punto de reciclaje
    </h1>

    <div>
      <Map2 latitud={safeLat} longitud={safeLng} setFormData={setFormData} />
    </div>

    <form
      onSubmit={handleUpdate}
      className="mt-20 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white border border-slate-200 shadow-md rounded-3xl p-8"
    >
      {/* Coordenadas */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Latitud</label>
        <input
          type="number"
          step="0.00001"
          value={formData.latitude || ""}
          onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          placeholder="Ej. -34.6037"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
        />
        {errors.latitude && <p className="text-red-600 text-xs mt-1">{errors.latitude[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Longitud</label>
        <input
          type="number"
          step="0.00001"
          value={formData.longitude || ""}
          onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          placeholder="Ej. -58.3816"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
        />
        {errors.longitude && <p className="text-red-600 text-xs mt-1">{errors.longitude[0]}</p>}
      </div>

      {/* Tipo de punto */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Tipos de residuos</label>
        <select
          multiple
          value={formData.types}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, opt => Number(opt.value));
            setFormData({ ...formData, types: selectedOptions });
          }}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
        >
          {allTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.point_ids && <p className="text-red-600 text-xs mt-1">{errors.point_ids[0]}</p>}
      </div>

      {/* Info del lugar */}
      <div className="sm:col-span-2 bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-inner space-y-1">
        <h3 className="text-base font-semibold text-slate-700 mb-2">📄 Información del lugar</h3>
        <p><strong>📛 Nombre:</strong> {formData.name || "—"}</p>
        <p className="dark:text-gray-200 gap-2"><strong>📌 Tipo de lugar:</strong> {translateToSpanish(formData.place_type, "place_type") || "—"}</p>
        <p><strong>📍 Dirección:</strong> {formData.address || "—"}</p>
        <p><strong>🏘 Localidad:</strong> {formData.city || "—"}</p>
        <p><strong>🗺 Región:</strong> {formData.region || "—"}</p>
        <p><strong>🌎 País:</strong> {formData.country || "—"}</p>
        <p><strong>📮 Código postal:</strong> {formData.postcode || "—"}</p>
        <p className="dark:text-gray-200 gap-2"><strong>📖 Tipo de vía:</strong> {translateToSpanish(formData.way, "way") || "—"}</p>
      </div>
      
      {/* Campo nombre editable */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del lugar</label>
          <input
            type="text"
            placeholder="Ej: Centro de Reciclaje Municipal"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name[0]}</p>}
          <div className="text-xs text-slate-500 mt-1">
            Este campo se autocompleta al hacer click en el mapa, pero puedes editarlo.<br/>
            Te pedimos que los nombres sean <b>respetuosos y adecuados para toda la comunidad</b>. Ayúdanos a mantener un espacio seguro y amigable.
          </div>
        </div>

      {/* Datos extra */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción (opcional)</label>
        <input
          type="text"
          placeholder="Ej: Este punto ahora también recibe vidrio."
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
        <input
          type="text"
          placeholder="Ej: +54 11 1234 5678"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
        <input
          type="email"
          placeholder="ejemplo@email.com"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
        />
      </div>

      <div className="sm:col-span-2 text-center mt-4">
        <button
          type="submit"
          disabled={isGeocoding}
          className="relative flex items-center justify-center w-full sm:w-[180px] border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] rounded-full shadow-lg py-3 px-5 text-sm transition-all duration-300"
        >
          {isGeocoding ? "Cargando datos..." : "💾 Actualizar punto"}
        </button>
      </div>
    </form>
  </div>
);



}