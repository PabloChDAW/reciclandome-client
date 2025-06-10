const API_URL = "http://localhost:5173/api/products";

export const getAllProducts = async (token) => {
  // Asegúrate de pasar el token a la función
  try {
    const response = await fetch("https://reciclandome-api-main-laravelcloud-4b3jba.laravel.cloud/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Aquí agregamos el token en la cabecera
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};
