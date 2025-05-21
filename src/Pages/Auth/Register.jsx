import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


export default function Register() {
  const { setToken } = useContext(AppContext);

  // Permite redireccionar automáticamente a una determinada ruta.
  const navigate = useNavigate();

  // Maneja el estado (valores) de los campos de entrada del formulario.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    /* Petición de autenticación */
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
      toastr.error(data.errors, 'Error al registrar');
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toastr.success('Tu cuenta ha sido creada exitosamente', '¡Bienvenido!');
      navigate("/");
    }
  }

  return (
    <>
      <div className="p-10 my-10 sm:py-10 sm:max-w-7xl mx-auto flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6 animate-fade-in-up">
          <h1 className="text-xl md:text-3xl font-semibold text-[#14532d] text-center mb-6 animate-fade-in-down">
            📝 REGÍSTRATE CON NOSOTROS
          </h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm md:text-base font-medium text-[#333]">👤 Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Introduce tu nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all duration-200 text-sm"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm md:text-base font-medium text-[#333]">📧 Email</label>
              <input
                type="text"
                id="email"
                placeholder="Introduce tu correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all duration-200 text-sm"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm md:text-base font-medium text-[#333]">🔒 Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Introduce tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all duration-200 text-sm"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password_confirmation" className="text-sm md:text-base font-medium text-[#333]">🔁 Confirmar contraseña</label>
              <input
                type="password"
                id="password_confirmation"
                placeholder="Confirma tu contraseña"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all duration-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-[#166534] bg-[#166534] text-white py-3 rounded-full hover:bg-white hover:text-[#166534] transition-all duration-300 shadow-md"
            >
              REGISTRARSE
            </button>
          </form>
          {/* Enlace de Registro debajo del botón */}
          <p className="text-sm text-center text-[#333] mt-4">
            ¿No tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-[#166534] font-semibold hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
