import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom"; // Asegúrate de tener esto si estás usando React Router


export default function Profile() {
    const { user, setUser } = useContext(AppContext);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

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
    }, [user]);

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
                }
            );
            const data = await res.json();

            if (data.secure_url) {
                setImageUrl(data.secure_url);
                localStorage.setItem(`profileImage_${user.id}`, data.secure_url);

                // Actualizamos también el user en contexto (opcional)
                setUser(prev => ({ ...prev, imageUrl: data.secure_url }));
            } else {
                alert("Error al subir la imagen");
            }
        } catch (error) {
            alert("Error en la subida");
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
                        className="inline-block border border-[#166534] bg-[#166534] hover:bg-white text-white hover:text-[#166534] rounded-full font-semibold px-5 py-2 transition shadow-md duration-300"
                    >
                        📦 Ver mis pedidos
                    </Link>
                </div>
            </div>
        </div>
    );

}
