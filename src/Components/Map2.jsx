import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './Map2.css';

export default function Map2({ latitud, longitud, setFormData }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;
  const marker = useRef(null);
  maptilersdk.config.apiKey = 'bmHH9ekzKdndbQ2GrZEm';
  const [noSeCentra, setNoSeCentra] = useState(false);

  useEffect(() => {
    if (!latitud || !longitud || map.current) return;
    if (latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180) {
      latitud = parseFloat(latitud);
      longitud = parseFloat(longitud);
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [longitud, latitud],
        zoom: zoom
      });
      marker.current = new maptilersdk.Marker({
        color: "#4F46E5", /* Morado rexulón */
        draggable: true,   /* Para poder arrastrarla */
      })

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
      console.error('Coordenadas inválidas:', latitud, longitud);
      //TODO: Implementar un aviso de coordenadas inválidas o mapa por defecto.
    }
  }, []);

  useEffect(() => {
    if (!map.current) return;
    if (latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180) {
      const handleClick = (e) => {
        const { lng, lat } = e.lngLat;
        console.log("Coordenadas click:", lng, lat);

        setNoSeCentra(true)
        setFormData(prevState => ({
          ...prevState,
          latitude: lat,
          longitude: lng,
        }));
      };

      map.current.on('click', handleClick);

      marker.current.setLngLat([longitud, latitud]);

      if (!noSeCentra) {
        map.current.setCenter([longitud, latitud]);
      }
      setNoSeCentra(false);


      return () => {
        if (map.current) {
          map.current.off('click', handleClick);
        }
      };
    }
  }, [latitud, longitud]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
