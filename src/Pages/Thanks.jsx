import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirigir al inicio tras 10 segundos (opcional)
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 ¡Gracias por tu compra!</h1>
      <p style={styles.text}>Tu pedido ha sido procesado correctamente.</p>
      <p style={styles.text}>En breve recibirás un correo de confirmación.</p>
      <p style={styles.redirect}>Serás redirigido a la página principal en unos segundos...</p>
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
