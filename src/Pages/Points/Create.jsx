import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Map2 from "../../Components/Map2";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { translateToSpanish } from '../../Utils/translations';

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
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

  const [pointTypes, setPointTypes] = useState([]);
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
  useEffect(() => {
    const fetchPointTypes = async () => {
      try {
        const response = await fetch("/api/types", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener tipos de residuos");
        }

        const data = await response.json();
        setPointTypes(data); // Asegúrate de que `data` es un array de objetos con `id` y `name`
      } catch (error) {
        console.error("Error cargando tipos de residuos:", error);
      }
    };

    fetchPointTypes();
  }, []);
  // Generar URL única
  const generateUrl = (name, lat, lng) => {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    const base = 'https://www.google.com/maps/dir/?api=1&destination=';
    return `${base}${lat},${lng}`;
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
    console.log(errors)
    if(data.lugarVacio){
      toastr.error(data.errors, 'Error al crear punto');
    }
    else{
      toastr.error('Por favor, revisa los datos del formulario.', 'Error al crear punto');
    }

  } else {
    toastr.success('¡Punto creado con satisfacción! Gracias por colaborar.', 'Éxito');
    navigate("/");
  }

    // console.log(formData);
    // console.log(data);
  }

  return (
    <div className="py-20">
      <h1 className="dark:text-white text-3xl font-bold mb-8 text-center">
        📍 Crear un nuevo punto de reciclaje
      </h1>

      <div >
        <Map2 latitud={safeLat} longitud={safeLng} setFormData={setFormData} />
      </div>

      <form
        onSubmit={handleCreate}
        className="dark:bg-[#344735] mt-20 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white border border-slate-200 shadow-md rounded-3xl p-8"
      >
        {/* Coordenadas */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-white mb-1">Latitud</label>
          <input
            type="number"
            step="0.00001"
            value={formData.latitude || ""}
            onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value || 0) })}
            placeholder="Ej. -34.6037"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
          />
          {errors.latitude && <p className="text-red-600 text-xs mt-1">{errors.latitude[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-white mb-1">Longitud</label>
          <input
            type="number"
            step="0.00001"
            value={formData.longitude || ""}
            onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value || 0)})}
            placeholder="Ej. -58.3816"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
          />
          {errors.longitude && <p className="text-red-600 text-xs mt-1">{errors.longitude[0]}</p>}
        </div>

        {/* Tipo de punto mejorado visualmente */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-3">Tipos de residuos</label>
          <div className="flex flex-wrap gap-3">
            {pointTypes.map((type) => {
              const isChecked = formData.types?.includes(type.id);
              return (
                <label
                  key={type.id}
                  htmlFor={`type-${type.id}`}
                  className={`cursor-pointer border rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 
            ${isChecked
                      ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-white border-green-500'
                      : 'bg-white dark:bg-[#577759] text-slate-700 dark:text-white border-gray-300 hover:border-green-400'
                    }`}
                >
                  <input
                    type="checkbox"
                    id={`type-${type.id}`}
                    value={type.id}
                    checked={isChecked}
                    onChange={(e) => {
                      const typeId = parseInt(e.target.value);
                      const newTypes = e.target.checked
                        ? [...(formData.types || []), typeId]
                        : (formData.types || []).filter((id) => id !== typeId);
                      setFormData({ ...formData, types: newTypes });
                    }}
                    className="hidden"
                  />
                  {type.name}
                </label>
              );
            })}
          </div>
          {errors.types && <p className="text-red-600 text-xs mt-2">{errors.types[0]}</p>}
        </div>


        {/* Info extra autocompletada */}
        <div className="sm:col-span-2 bg-slate-50 dark:bg-[#577759] border border-slate-200 p-5 rounded-xl shadow-inner space-y-1">
          <h3 className="text-base font-semibold text-slate-700 dark:text-white mb-2">📄 Información del lugar</h3>
          <p className="dark:text-gray-200 gap-2"><strong>🏷  Nombre:</strong> {formData.name || "—"}</p>
          <p className="dark:text-gray-200 gap-2"><strong>📌 Tipo de lugar:</strong> {translateToSpanish(formData.place_type, "place_type") || "—"}</p>
          <p className="dark:text-gray-200 gap-2"><strong>📍 Dirección:</strong> {formData.address || "—"}</p>
          <p className="dark:text-gray-200 gap-2"><strong>🏙  Localidad:</strong> {formData.city || "—"}</p>
          <p className="dark:text-gray-200 gap-2"><strong>🌎 Región:</strong> {formData.region || "—"}</p>
          <p className="dark:text-gray-200 gap-2"><strong>🌐 País:</strong> {formData.country || "—"}</p>
          <p className="dark:text-gray-200 gap-2"><strong>📮 Código postal:</strong> {formData.postcode || "—"}</p>
          <p className="dark:text-gray-200 gap-2"><strong>📖 Tipo de vía:</strong> {translateToSpanish(formData.way, "way") || "—"}</p>
        </div>

        {/* Campo nombre editable */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-white mb-1">Nombre del lugar</label>
          <input
            type="text"
            placeholder="Ej: Centro de Reciclaje Municipal"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name[0]}</p>}
          <div className="text-xs text-slate-500 dark:text-slate-200 mt-1">
            Este campo se autocompleta al hacer click en el mapa, pero puedes editarlo.<br/>
            Te pedimos que los nombres sean <b>respetuosos y adecuados para toda la comunidad</b>. Ayúdanos a mantener un espacio seguro y amigable.
          </div>
        </div>

        {/* Datos extra del usuario */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-white mb-1">Descripción (opcional)</label>
          <input
            type="text"
            placeholder="Ej: Este punto recibe plásticos y cartones."
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-white mb-1">Teléfono</label>
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
            className="relative flex items-center justify-center w-full sm:w-[150px] border dark:border-[#577759] border-[#166534]  dark:bg-[#577759] bg-[#166534] dark:hover:bg-white text-white hover:bg-white dark:hover:text-[#577759] hover:text-[#166534] rounded-full shadow-lg py-3 px-5 text-sm transition-all duration-300"
          >
            {isGeocoding ? "Cargando datos..." : "✅ Crear punto"}
          </button>
        </div>
      </form>
    </div>

  );
}
