import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";

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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">👤 Mi Perfil</h1>

      <div className="space-y-4 text-gray-700 dark:text-gray-200">
        <div>
          <span className="font-semibold">Nombre:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>

        {imageUrl ? (
          <div>
            <img
              src={imageUrl}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover mb-2"
            />
            <button
              onClick={handleRemoveImage}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Eliminar imagen
            </button>
          </div>
        ) : (
          <div>
            <p className="italic text-gray-500 dark:text-gray-400">No tienes imagen de perfil</p>
            <label className="block mt-2 cursor-pointer text-green-700 dark:text-green-300 font-semibold">
              {uploading ? "Subiendo..." : "Cambiar foto de perfil"}
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
      </div>
    </div>
  );
}
