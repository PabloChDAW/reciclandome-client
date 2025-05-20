import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirigir al inicio tras 5 segundos (opcional)
      navigate("/shop");
    }, 5000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto mt-24 mb-24 px-8 py-12 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-3xl shadow-2xl text-center animate-fade-in">
      
      {/* Checkmark circle */}
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl font-bold animate-scale-pop">
        ✓
      </div>

      <h1 className="text-3xl font-extrabold text-green-800 mb-4">
        ¡Gracias por tu compra!
      </h1>

      <p className="text-lg text-gray-700 mb-2">
        Tu pedido ha sido procesado correctamente.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        En breve recibirás un correo de confirmación.
      </p>

      <p className="text-sm text-gray-500 italic">
        Serás redirigido en <span className="font-semibold text-green-600"></span> segundos...
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  redirect: {
    marginTop: "2rem",
    fontSize: "0.9rem",
    color: "#777",
  },
};
