import React from "react";
import { Mail, Instagram, X, Music2 } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="w-full bg-white text-[#131700] text-sm">
      {/* Línea superior pegada */}
      <div className="border-t border-gray-200 border-opacity-40" />
      
      {/* Contenido centrado */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-600">
          © 2025 Reciclando.me. Todos los derechos reservados.{" "}
          <Link to="/aviso-legal" className="hover:text-green-700 hover:underline">
            Aviso legal
          </Link>{" "}
          |{" "}
          <Link to="/privacidad" className="hover:text-green-700 hover:underline">
            Política de privacidad
          </Link>{" "}
          |{" "}
          <Link to="/cookies" className="hover:text-green-700 hover:underline">
            Política de cookies
          </Link>
        </p>
      </div>
    </footer>
    );
};

export default Footer;
