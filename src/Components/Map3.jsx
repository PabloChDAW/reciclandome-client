import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './Map3.css';

//añadimos el prop onMarkerClick
export default function Map3({ points, onMarkerClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 4.5; //se puede ampliar a 14 cuando se tenga la funcionalidad del GPS

  //pasamo de null a usar un array. Esto permite mantener múltiples referencias a los marcadores y eliminarlos correctamente después si es necesario.
  const markers = useRef([]);

  maptilersdk.config.apiKey = 'bmHH9ekzKdndbQ2GrZEm';
  console.log('Estructura de points:', points);

  useEffect(() => {
    //if (points && points.length > 0) {
      if (!map.current) {
        map.current = new maptilersdk.Map({
          container: mapContainer.current,
          style: maptilersdk.MapStyle.STREETS,
          center: [-3.7038, 40.4168], /** <-- Aquí no hace falta sanitización. El 0 es bien recibido, 
                supongo por las múltiples chinchetas
                * TODO <-- Estas pueden ser las coordenadas del GPS para centrarnos donde estamos y ver qué hay cerca
                */
          zoom: zoom
        });
        // Desactivar scroll zoom por defecto
        map.current.scrollZoom.disable();

        // Escuchar cuando se presiona Ctrl y habilitar scrollZoom
        const handleKeyDown = (e) => {
          if (e.ctrlKey) {
            map.current.scrollZoom.enable();
          }
        };

        // Escuchar cuando se suelta Ctrl y deshabilitar scrollZoom
        const handleKeyUp = () => {
          map.current.scrollZoom.disable();
        };

        // También manejar pérdida de foco
        const handleBlur = () => {
          map.current.scrollZoom.disable();
        };

        // Listeners
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleBlur);

      }

      // Limpiar marcadores antiguos si hubiera
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      points.forEach(point => {
        const latitude = parseFloat(point.latitude);
        const longitude = parseFloat(point.longitude);

        const newMarker = new maptilersdk.Marker({
          color: "#476488",
        })
          .setLngLat([longitude, latitude])
          .addTo(map.current)

        newMarker.getElement().addEventListener('click', () => {
          // Centrar el mapa en la chincheta
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 14, // Puedes ajustar el zoom al nivel que prefieras
            speed: 1.2, // Velocidad de la animación
            curve: 1.42, // Suavidad de la animación
            essential: true // Esto asegura que el movimiento ocurra incluso si el usuario ha reducido animaciones
          });

          // Llamar a la función pasada como prop
          onMarkerClick(point);
        });

        markers.current.push(newMarker);
      });
    //}

    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        map.current.remove();
        map.current = null;
      }
    };
  }, [points, onMarkerClick]);


  return (
    <div className="map-container">
      {points.length > 0 ? (
        <div ref={mapContainer} style={{ width: '100%', height: '650px' }}></div>
      ) : (

        <div ref={mapContainer} style={{ width: '100%', height: '650px' }}></div>

      )}
    </div>
  );
}