import { useEffect, useState, useRef } from "react";
import Map3 from "../Components/Map3";
import InfoBox from "../Components/Infobox";
import PointItem from "../Components/PointItem";
import ToggleSwitchFilter from "../Components/ToggleSwitchFilter";
export default function ShowPointsPage() {
    const [points, setPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [cargando, setCargando] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const [filters, setFilters] = useState({
    user: false,
    city: '',
    name: '',
    point_type: '',
    place_type: '',
    way: ''
    });
    const [cityOptions, setCityOptions] = useState([]);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [types, setTypes] = useState([]);
    // Para poder usar eventos y utilidades del mapa fuera del mismo
    // se debe centralizar un estado que le identifique en la página que lo carga
    // Además, las utilidades que quieran usarse del mapa en otros componentes deben declararse aquí y 
    // ser pasadas como props al componente del mapa para ser gestionados desde allí. 
    const mapRef = useRef(null); 

    const handleMarkerClick = (point) => {
        setSelectedPoint(point);
        centerMapOnPoint(point);
        const mapaElement = document.getElementById('mapa');
        if (mapaElement) {
            mapaElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const centerMapOnPoint = (point) => {
        if (mapRef.current) {
            const latitude = parseFloat(point.latitude);
            const longitude = parseFloat(point.longitude);
            
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 14,
                speed: 1.2,
                curve: 1.42,
                essential: true
            });
        }
    };

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                return;
            }

            const res = await fetch("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Error verificando autenticación:", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const handleUserToggle = () => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para ver tus puntos");
            return;
        }
        setFilters(prev => ({ ...prev, user: !prev.user }));
    };

    // Obtener puntos de reciclaje
    // Obtener puntos de reciclaje con filtros
    async function getPoints() {
    setCargando(true);
    
    const params = new URLSearchParams();
    
    // Solo agregar filtros si hay alguno activo
    const activeFilters = {};
    if (filters.user && isAuthenticated) {
            activeFilters.user = 'me';
        }
    if (filters.city) activeFilters.city = filters.city;
    if (filters.name) activeFilters.name = filters.name;
    if (filters.point_type) activeFilters.point_type = filters.point_type;
    if (filters.place_type) activeFilters.place_type = filters.place_type;
    if (filters.way) activeFilters.way = filters.way;
    
    if (Object.keys(activeFilters).length > 0) {
        params.append('filters', JSON.stringify(activeFilters));
    }
    
    try {
        const headers = {
            Accept: "application/json",
        };
        const token = localStorage.getItem("token");
        if (token && isAuthenticated) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`/api/points/filter?${params}`, {headers});
        const data = await res.json();
        console.log(data);

        if (res.ok) {
        setPoints(data);
        }
        console.log("los punticos son: "+data)
    } catch (error) {
        console.error('Error obteniendo puntos:', error);
    }
    
    setCargando(false);
    }

    async function getTypes() {
        try {
            const res = await fetch("/api/types");
            const data = await res.json();
            if (res.ok) {
            setTypes(data);
            }
        } catch (error) {
            console.error('Error obteniendo tipos:', error);
        }
    }

    const searchCities = async (searchTerm) => {
        if (searchTerm.length < 3) {
            setCityOptions([]);
            setShowCityDropdown(false);
            return;
        }

        try {
            // Obtener ciudades únicas de los puntos existentes
            const res = await fetch("/api/points");
            const allPoints = await res.json();
            
            if (res.ok) {
            const cities = [...new Set(
                allPoints
                .map(point => point.city)
                .filter(city => city && city.toLowerCase().includes(searchTerm.toLowerCase()))
            )].slice(0, 10); // Limitar a 10 sugerencias
            
            setCityOptions(cities);
            setShowCityDropdown(cities.length > 0);
            }
        } catch (error) {
            console.error('Error buscando ciudades:', error);
        }
    };

   
    useEffect(() => {
        checkAuth();
        getTypes();
    }, []);

    useEffect(() => {
        console.log('Filtros cambiaron:', filters);
        console.log('Estado autenticación:', isAuthenticated);
        getPoints();
    }, [filters, isAuthenticated]);

    return (
        <>
            <div className="py-20 ">

                <h1 className="dark:text-white text-3xl font-bold text-center mb-8">
                    ♻️ Puntos de Reciclaje
                </h1>

                <div className="max-w-7xl mx-auto px-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Toggle para mis puntos */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    {isAuthenticated ? "Mostrar mis puntos" : "Mostrar puntos"}
                                </label>
                                <div className="relative">
                                    <ToggleSwitchFilter
                                        enabled={filters.user && isAuthenticated}
                                        onToggle={handleUserToggle}
                                        disabled={!isAuthenticated}
                                    />
                                    {!isAuthenticated && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Inicia sesión para filtrar tus puntos
                                        </p>
                                    )}
                                </div>
                            </div>
                        
                        {/* Buscador de ciudades */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Filtrar por ciudad
                            </label>
                            <input
                            type="text"
                            value={filters.city}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFilters(prev => ({ ...prev, city: value }));
                                searchCities(value);
                            }}
                            onFocus={() => {
                                if (filters.city.length >= 3) setShowCityDropdown(true);
                            }}
                            onBlur={() => {
                                // Delay para permitir click en dropdown
                                setTimeout(() => setShowCityDropdown(false), 200);
                            }}
                            placeholder="Escribe al menos 3 letras..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            
                            {/* Dropdown de sugerencias */}
                            {showCityDropdown && cityOptions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {cityOptions.map((city, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                    setFilters(prev => ({ ...prev, city }));
                                    setShowCityDropdown(false);
                                    }}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                                >
                                    {city}
                                </button>
                                ))}
                            </div>
                            )}
                        </div>
                        
                        {/* Buscador por nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buscar por nombre
                            </label>
                            <input
                            type="text"
                            value={filters.name}
                            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Nombre del punto..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        
                        {/* Filtro por tipo de punto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de punto
                            </label>
                            <select
                            value={filters.point_type}
                            onChange={(e) => setFilters(prev => ({ ...prev, point_type: e.target.value }))}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                            <option value="">Todos los tipos</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.name}>
                                {type.name}
                                </option>
                            ))}
                            </select>
                        </div>
                        
                        {/* Filtro por tipo de lugar */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de lugar
                            </label>
                            <select
                            value={filters.place_type}
                            onChange={(e) => setFilters(prev => ({ ...prev, place_type: e.target.value }))}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                            <option value="">Todos los lugares</option>
                            <option value="address">Dirección</option>
                            <option value="poi">Punto de interés</option>
                            <option value="neighborhood">Barrio</option>
                            <option value="locality">Localidad</option>
                            <option value="municipality">Municipio</option>
                            <option value="region">Región</option>
                            <option value="country">País</option>
                            <option value="postcode">Código postal</option>
                            <option value="place">Lugar</option>
                            </select>
                        </div>
                        
                        {/* Filtro por vía */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de vía
                            </label>
                            <select
                            value={filters.way}
                            onChange={(e) => setFilters(prev => ({ ...prev, way: e.target.value }))}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                            <option value="">Todas las vías</option>
                            <option value="road">Carretera</option>
                            <option value="street">Calle</option>
                            <option value="admin_area">Área administrativa</option>
                            <option value="building">Edificio</option>
                            <option value="natural">Elemento natural</option>
                            <option value="water">Agua</option>
                            <option value="landuse">Uso de suelo</option>
                            </select>
                        </div>
                        </div>
                        
                        {/* Botón para limpiar filtros */}
                        <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setFilters({
                            user: false,
                            city: '',
                            name: '',
                            point_type: '',
                            place_type: '',
                            way: ''
                            })}
                            className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
                        >
                            Limpiar filtros
                        </button>
                        </div>
                    </div>
                    </div>
                <div id="mapa" className="mb-10 overflow-hidden border border-slate-200 shadow-[0_0_20px_3px_rgba(34,197,94,0.4)] transition-all duration-500">
                    <Map3 points={points} onMarkerClick={handleMarkerClick} centerOnPoint={selectedPoint} />
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Info del punto seleccionado */}
                    {selectedPoint && <InfoBox selectedPoint={selectedPoint} />}

                    {/* Título de sección */}
                    <section className="mt-20">
                        <h3 className="dark:text-white text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
                        📌 {filters.user ? 'Mis puntos de reciclaje' : 
                            filters.city || filters.name || filters.point_type || filters.place_type || filters.way ? 
                            'Filtrando puntos' : 
                            'Todos los puntos de reciclaje'}
                        </h3>

                        {/* Lista de puntos */}
                        {points.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {points.map((point) => (
                                    <PointItem key={point.id} point={point} onCenterMap={handleMarkerClick} />
                                ))}
                            </div>
                        ) : (
                            cargando?
                            <p className="text-center text-sm text-slate-500 italic mt-8">
                                Cargando puntos...
                            </p>
                            :
                            <p className="text-center text-sm text-slate-500 italic mt-8">
                                {Object.values(filters).some(value => value !== false && value !== '') ? 
                                'No se encontraron puntos con los filtros seleccionados.' : 
                                'No hay puntos disponibles actualmente.'}
                            </p>
                        )}
                    </section>
                </div>

            </div>
        </>
    )
}
