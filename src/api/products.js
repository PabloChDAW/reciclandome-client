const API_URL = "https://reciclandome-api-main-laravelcloud-4b3jba.laravel.cloud/api/products";

export const getAllProducts = async (token) => {
  // Asegúrate de pasar el token a la función
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Aquí agregamos el token en la cabecera
        'X-Requested-With': 'XMLHttpRequest'
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
