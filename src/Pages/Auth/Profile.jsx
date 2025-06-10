import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import PointItemProfile from "../../Components/PointItemProfile";
import { AppContext } from "../../Context/AppContext";
import toastr from 'toastr';

export default function Profile() {
    const { user, setUser } = useContext(AppContext);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [userPoints, setUserPoints] = useState([])
    const [cargando, setCargando] = useState(false)    
    // Carga la imagen guardada para este usuario al cambiar user
    useEffect(() => {
        if (user?.id) {
            const savedImage = localStorage.getItem(`profileImage_${user.id}`);
            if (savedImage) {
                setImageUrl(savedImage);
            } else {
                setImageUrl("");
            }
        }
        getPoints()
    }, [user]);

    async function getPoints() {
    setCargando(true);
    
    const params = new URLSearchParams();
        const token = localStorage.getItem("token");
        if (token) {
            const filters = {
            user: "me",
            }
            //Transformar así o fallará
            params.append("filters", JSON.stringify(filters))
        }
        else{
            // navigate('/')
        }


    params.append("order_by", "created_at")
    params.append("order_direction", "desc")

    try {
        const headers = {
            Accept: "application/json",
        };
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`https://reciclandome-api-main-laravelcloud-4b3jba.laravel.cloud/api/points/filter?${params}`, {headers});
        const data = await res.json();
        console.log(data);

        if (res.ok) {
        setUserPoints(data);
        }
        console.log("los punticos son: ", data)
    } catch (error) {
        console.error('Error obteniendo puntos:', error);
    }
    
    setCargando(false);
    }

    // Función para manejar la eliminación de un punto
  const handleDeletePoint = (pointId) => {
    getPoints()
  }
    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file || !user?.id) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "perfil_usuario"); // tu preset

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dmauveev9/image/upload",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                    'Content-Type': 'application/json'
                },
                }
            );
            const data = await res.json();

            if (data.secure_url) {
                setImageUrl(data.secure_url);
                localStorage.setItem(`profileImage_${user.id}`, data.secure_url);

                // Actualizamos también el user en contexto (opcional)
                setUser(prev => ({ ...prev, imageUrl: data.secure_url }));
            } else {
                toastr.error("Error al subir la imagen");
            }
        } catch (error) {
            toastr.error("Error en la subida");
        } finally {
            setUploading(false);
        }
    }

    const handleRemoveImage = () => {
        if (!user?.id) return;
        localStorage.removeItem(`profileImage_${user.id}`);
        setImageUrl("");
        setUser(prev => ({ ...prev, imageUrl: null }));
    };

    if (!user) {
        return <div className="p-10">🔒 Debes estar logueado para ver esta página.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 p-8 bg-white dark:bg-[#344735] rounded-2xl shadow-lg border transition-all">
            <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Foto de perfil"
                            className="w-16 h-16 sm:w-32 sm:h-32  rounded-full object-cover border-4 border-green-500 shadow-md"
                        />
                    ) : (
                        <div className="w-16 h-16 sm:w-32 sm:h-32 flex items-center justify-center text-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-300 text-sm border-4 border-gray-300 dark:border-gray-600">
                            Sin imagen
                        </div>
                    )}
                    {imageUrl && (
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow-md transition"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Mi Perfil</h1>
                    <p className="text-gray-600 dark:text-white">Información personal del usuario</p>
                </div>
            </div>

            <div className="space-y-4 text-gray-800 dark:text-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <span className="font-semibold">👤 Nombre:</span>
                        <p className="ml-2 dark:text-gray-100">{user.name}</p>
                    </div>
                    <div>
                        <span className="font-semibold">📧 Email:</span>
                        <p className="ml-2 dark:text-gray-100">{user.email}</p>
                    </div>
                </div>

                {!imageUrl && (
                    <div className="mt-6">
                        <label className="inline-block cursor-pointer text-green-600 dark:text-green-300 font-medium hover:underline">
                            {uploading ? "Subiendo..." : "📷 Añadir foto de perfil"}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>
                    </div>
                )}

                {/* Nuevo botón de ir a pedidos */}
                <div className="mt-8">
                    <Link
                        to="/orders"
                        className="inline-block borderdark:border-[#577759] border-[#166534]  dark:bg-[#577759] bg-[#166534] dark:hover:bg-white text-white hover:bg-white dark:hover:text-[#577759] hover:text-[#166534] rounded-full font-semibold px-5 py-2 transition shadow-md duration-300"
                    >
                        📦 Ver mis pedidos
                    </Link>
                </div>
                {/* Sección: Mis Puntos de Reciclaje */}
                <div className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">♻️ Mis Puntos de Reciclaje</h2>
                    <Link
                    to="/create"
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium text-center py-1 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200"
                    >
                    + Añadir punto
                    </Link>
                </div>

                {cargando ? (
                    <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                    <p className="mt-2">Cargando puntos...</p>
                    </div>
                ) : userPoints.length > 0 ? (
                    <div className="space-y-3">
                    {userPoints.map((point) => (
                        <PointItemProfile key={point.id} point={point} handleDeletePoint={handleDeletePoint}/>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-300">No has creado ningún punto de reciclaje todavía.</p>
                    <Link to="/create" className="inline-block mt-3 text-green-600 dark:text-green-400 hover:underline">
                        Crea tu primer punto
                    </Link>
                    </div>
                )}
                </div>
            </div>
        </div>
    );

}
