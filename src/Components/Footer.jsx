import { Mail } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="border-t-2 border-b-[#577759] w-2/4 mb-10"></div>
      </div>
      <footer className="bg-[#EBF0EB] dark:bg-[#b5c3b5] text-center items-center justify-center border-t border-gray-200 text-sm text-[#131700] border-opacity-40">
        <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-48 h-auto hover:scale-105 transform duration-700 mb-2">
              <img src="/reciclin_verde.png"></img>
            </div>
          </div>

          {/* CONTACTO */}
          <div>
            <h3 className="font-bold text-lg">CONTACTO</h3>
            <p className="dark:text-[#577759] mt-2">
              Dirección: c/Ibn Hazm, 14
              <br />
              Córdoba, España
            </p>
            <p className="dark:text-[#577759]">Teléfono: +34 619 24 67 79</p>
            <p className="dark:text-[#577759]">
              Correo Electrónico:{" "}
              <a
                href="mailto:inforeciclando.me@gmail.com"
                className="text-green-700 dark:text-[#577759] hover:underline"
              >
                inforeciclando.me@gmail.com
              </a>
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-bold text-lg">LINKS</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <Link to="/" className="dark:text-[#577759] dark:hover:text-green-700 hover:text-green-700 hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/show"
                  className="dark:text-[#577759] dark:hover:text-green-700 hover:text-green-700 hover:underline"
                >
                  Mapa
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="dark:text-[#577759] dark:hover:text-green-700 hover:text-green-700 hover:underline"
                >
                  Quienes somos
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="dark:text-[#577759] dark:hover:text-green-700 hover:text-green-700 hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="dark:text-[#577759] dark:hover:text-green-700 hover:text-green-700 hover:underline"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="dark:text-[#577759] dark:hover:text-green-700 hover:text-green-700 hover:underline"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* REDES */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg">NUESTRAS REDES</h3>
            <div className="flex space-x-4 mt-3 text-2xl text-[#577759]">
              <div
                title="inforeciclando.me@gmail.com"
                className="w-6 h-6 hover:scale-110 transform duration-700"
              >
                <Mail className="w-6 h-6" />
              </div>
              <a
                href="https://www.tiktok.com/@reciclando.me_oficial"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="w-6 h-6 hover:scale-110 transform duration-700" />
              </a>
              <a
                href="https://x.com/reciclando_me_"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="w-6 h-6 hover:scale-110 transform duration-700" />
              </a>
              <a
                href="https://www.instagram.com/reciclando.me_oficial/"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 hover:scale-110 transform duration-700" />
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pb-5 border-t bg-white dark:bg-[#577759] border-gray-200 mt-6 pt-4 text-center text-xs text-gray-600 ">
          <p className="dark:text-white ">
            Copyright © 2025 Reciclando.me. Todos los derechos reservados.{" "}
            <Link
              to="/aviso-legal"
              className="dark:hover:text-white dark:hover:font-semibold  hover:text-green-700 hover:underline"
            >
              Aviso legal
            </Link>{" "}
            |{" "}
            <Link
              to="/politica-privacidad"
              className="dark:hover:text-white dark:hover:font-semibold  hover:text-green-700 hover:underline"
            >
              Política de privacidad
            </Link>{" "}
            |{" "}
            <Link
              to="/politica-cookies"
              className="dark:hover:text-white dark:hover:font-semibold  hover:text-green-700 hover:underline"
            >
              Política de cookies
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
