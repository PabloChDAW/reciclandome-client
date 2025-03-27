import { useState } from "react";

export default function Register() {
  // Maneja el estado (valores) de los campos de entrada del formulario.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  async function handleRegister(e) {
    e.preventDefault();
    /* Petición de autenticación */
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    console.log(data);
  }

  return (
    <>
      <h1 className="title">Regístrate</h1>
      <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
          />
        </div>
        <button className="primary-btn">Registrarse</button>
      </form>
    </>
  );
}
