import { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./Map.css";

export default function Map({ latitud, longitud }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;

  maptilersdk.config.apiKey = "bmHH9ekzKdndbQ2GrZEm";

  useEffect(() => {
    if (map.current) return;

    if (
      latitud >= -90 &&
      latitud <= 90 &&
      longitud >= -180 &&
      longitud <= 180
    ) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [longitud, latitud],
        zoom: zoom,
      });

      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([longitud, latitud])
        .addTo(map.current);

      map.current.scrollZoom.disable();

      const handleKeyDown = (e) => {
        if (e.ctrlKey) {
          map.current.scrollZoom.enable();
        }
      };

      const handleKeyUp = () => {
        map.current.scrollZoom.disable();
      };

      const handleBlur = () => {
        map.current.scrollZoom.disable();
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", handleBlur);

      // ✅ Limpieza al desmontar
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("blur", handleBlur);

        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } else {
      console.error("Coordenadas inválidas:", latitud, longitud);
    }
  }, [latitud, longitud, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map h-[650px]">
      </div>
    </div>
  );
}
