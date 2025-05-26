import { Mail, MapPin } from "lucide-react";
import { FaTiktok, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function TopHeader() {
  return (
    <div className="bg-[#D0FDD7] z-50 opacity-20 hover:opacity-100 transition duration-700 w-full mt-0 text-gray-800 dark:text-gray-800 flex flex-wrap items-center justify-between px-4 py-2 ">
      {/* Información de contacto */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto sm:flex-row">
        <div className="flex items-center gap-1 text-xs sm:text-sm justify-center">
          <Mail className="w-4 lg:w-5 md:w-4 sm:w-4  h-auto text-black" />
          <span className="text-[12px] lg:text-[16px] md:text-[14px] sm:text-[14px]  font-bold">
            inforeciclando.me@gmail.com
          </span>
        </div>
      </div>
      {/* Dirección */}
      <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-start mt-2 sm:mt-0">
        <MapPin className="w-4 lg:w-5 md:w-4 sm:w-4 h-auto text-black" />
        <span className=" text-[12px] lg:text-[16px] md:text-[14px] sm:text-[14px] font-bold">
          Calle Ibn Hazm, 14 Córdoba, España
        </span>
      </div>

      {/* Redes sociales */}
      <div className="flex gap-3 w-full sm:w-auto  justify-center sm:justify-start mt-2 sm:mt-0">
        <a
          href="https://www.tiktok.com/@reciclando.me_oficial"
          aria-label="TikTok"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok
            className="w-4 lg:w-6 md:w-4  h-auto cursor-pointer hover:text-black hover:scale-110 transition duration-700"
            aria-label="TikTok"
          />
        </a>
        <a
          href="https://x.com/reciclando_me_"
          aria-label="XTwitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter
            className="w-4 lg:w-6 md:w-4  h-auto cursor-pointer hover:text-black hover:scale-110 transition duration-700"
            aria-label="Twitter"
          />
        </a>
        <a
          href="https://www.instagram.com/reciclando.me_oficial/"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            className="w-4 lg:w-6 md:w-4  h-auto cursor-pointer hover:text-black hover:scale-110 transition duration-700"
            aria-label="Instagram"
          />
        </a>
      </div>
    </div>
  );
}
