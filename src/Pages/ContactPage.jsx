import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useRef } from "react";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    sugerencias: "",
    ayuda: "",
    privacidad: false,
  });

  const formRef = useRef();

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido";
    }
    if (!formData.telefono.trim())
      newErrors.telefono = "El teléfono es obligatorio";
    if (!formData.ayuda.trim()) newErrors.ayuda = "Este campo es obligatorio";
    if (!formData.privacidad)
      newErrors.privacidad = "Debe aceptar la política de privacidad";
    return newErrors;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  emailjs
    .sendForm(
      "reciclando.me",
      "template_y0ytl1h",
      formRef.current,
      "fcShrk1Y_PhAVwNFE"
    )
    .then(
      (result) => {
        console.log(result.text);
        setSuccessMessage("✅ Enviado correctamente");
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          sugerencias: "",
          ayuda: "",
          privacidad: false,
        });
        setErrors({});
      },
      (error) => {
        console.error(error.text);
      }
    );
};


  const inputClass = (field) =>
    `mt-1 block w-full border-b bg-transparent ${
      errors[field] ? "border-red-500" : "border-black"
    } focus:outline-none text-green-950`;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/slider6.jpg')" }}
    >
      <div className="absolute inset-0 bg-white opacity-80"></div>

      <div className="p-10 sm:py-10 sm:max-w-7xl mx-auto grid md:grid-cols-2 max-w-6xl w-full relative z-10">
        <div>
          <h2 className="text-2xl md:text-5xl text-black mb-2">
            ¿Tienes alguna duda?
          </h2>
          <h3 className="text-2xl md:text-5xl text-black mb-6">¡ESCRÍBENOS!</h3>
          <p className="text-gray-600 max-w-md">
            Le atenderemos lo más rápido posible y resolveremos todas sus
            preguntas
          </p>
        </div>

        <form className="space-y-4 m-10 md:m-0" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md md:text-lg font-medium text-black">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={inputClass("nombre")}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label className="block text-md md:text-lg font-medium text-black">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={inputClass("correo")}
              />
              {errors.correo && (
                <p className="text-red-600 text-sm">{errors.correo}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md md:text-lg font-medium text-black">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={inputClass("telefono")}
              />
              {errors.telefono && (
                <p className="text-red-600 text-sm">{errors.telefono}</p>
              )}
            </div>
            <div>
              <label className="block text-md md:text-lg font-medium text-black">
                Asunto
              </label>
              <input
                type="text"
                name="sugerencias"
                value={formData.sugerencias}
                onChange={handleChange}
                className={inputClass("sugerencias")}
              />
            </div>
          </div>

          <div>
            <label className="block text-md md:text-lg font-medium text-black">
              ¿Cómo podemos ayudarle?
            </label>
            <input
              type="text"
              name="ayuda"
              value={formData.ayuda}
              onChange={handleChange}
              className={inputClass("ayuda")}
            />
            {errors.ayuda && (
              <p className="text-red-600 text-sm">{errors.ayuda}</p>
            )}
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <input
              type="checkbox"
              name="privacidad"
              checked={formData.privacidad}
              onChange={handleChange}
              className="accent-green-950 mt-1"
              id="privacy"
            />
            <label
              htmlFor="privacy"
              className="text-md md:text-lg text-green-950"
            >
              Acepto y he leído la{" "}
              <Link
                to="/politica-privacidad"
                className="hover:text-[#166534] font-bold"
              >
                Política de privacidad
              </Link>
            </label>
          </div>
          {errors.privacidad && (
            <p className="text-red-600 text-sm">{errors.privacidad}</p>
          )}

          <button
            type="submit"
            className="bg-[#131700] text-white px-6 py-2 mt-4 md:font-semibold shadow-md hover:bg-green-950"
          >
            ➤ ENVIAR
          </button>

          {successMessage && (
            <p className="text-green-700 text-md mt-4 font-semibold">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
