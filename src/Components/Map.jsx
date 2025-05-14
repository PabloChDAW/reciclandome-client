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
    if (map.current) return; // stops map from intializing more than once

    // Verifica que las coordenadas sean válidas. La validación en el front es importante para
    // Evitar problemas de renderizado
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
    } else {
      console.error("Coordenadas inválidas:", latitud, longitud);
      //TODO: Implementar un aviso de coordenadas inválidas o mapa por defecto.
    }
  }, [longitud, latitud, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
