import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import CriteriaItem from '../../Components/CriteriaItem'; 


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

  const [passwordCriteria, setPasswordCriteria] = useState({
  hasLowercase: false,
  hasUppercase: false,
  hasNumber: false,
  hasSymbol: false,
  hasMinLength: false,
  });

  const validatePassword = (password) => {
    return {
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      hasMinLength: password.length >= 10,
    };
  };

  const isPasswordValid = Object.values(passwordCriteria).every((criteria) => criteria);

  async function handleRegister(e) {
    e.preventDefault();
    if (!isPasswordValid) {
      return;
    }
    /* Petición de autenticación */
    const res = await fetch("https://reciclandome-api-main-nfmp30.laravel.cloud/register", {
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
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setFormData({ ...formData, password: newPassword });
                  setPasswordCriteria(validatePassword(newPassword));
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all duration-200 text-sm"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password[0]}</p>}
            </div>
            {formData.password && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Requisitos de contraseña:</p>
                <CriteriaItem met={passwordCriteria.hasMinLength} text="Al menos 12 caracteres" />
                <CriteriaItem met={passwordCriteria.hasLowercase} text="Al menos una letra minúscula" />
                <CriteriaItem met={passwordCriteria.hasUppercase} text="Al menos una letra mayúscula" />
                <CriteriaItem met={passwordCriteria.hasNumber} text="Al menos un número" />
                <CriteriaItem met={passwordCriteria.hasSymbol} text="Al menos un símbolo (!@#$%^&*)" />
              </div>
            )}
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
            {formData.password_confirmation && formData.password !== formData.password_confirmation && (
              <p className="text-sm text-red-500 mt-1">Las contraseñas no coinciden</p>
            )}
            <button
              type="submit"
              disabled={!isPasswordValid || formData.password !== formData.password_confirmation}
              className={`w-full py-3 rounded-full transition-all duration-300 shadow-md ${
                isPasswordValid && formData.password === formData.password_confirmation
                  ? "border border-[#166534] bg-[#166534] text-white hover:bg-white hover:text-[#166534]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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
