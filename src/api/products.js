const API_URL = "http://localhost:8000/api/products";

export const getAllProducts = async (token) => {
  // Asegúrate de pasar el token a la función
  try {
    const response = await fetch(API_URL, {
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
