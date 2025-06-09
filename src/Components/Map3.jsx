import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './Map3.css';

export default function Map3({ points, onMarkerClick, centerOnPoint }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 4.5;
  const markers = useRef([]);
  const [mapStyle, setMapStyle] = useState('streets');
  const styles = [
    { id: "streets", emoji: "🛣️" },
    { id: "satellite", emoji: "🛰️" },
    { id: "hybrid", emoji: "🌐" },
  ];


  maptilersdk.config.apiKey = 'bmHH9ekzKdndbQ2GrZEm';
  console.log('Estructura de points:', points);

  useEffect(() => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: mapStyle, // Usar estilo desde estado
        center: [-3.7038, 40.4168],
        zoom: zoom
      });

      map.current.scrollZoom.disable();

      const handleKeyDown = (e) => {
        if (e.ctrlKey && map.current) {
          map.current.scrollZoom.enable();
        }
      };

      const handleKeyUp = () => {
        if (map.current) {
          map.current.scrollZoom.disable();
        }
      };

      const handleBlur = () => {
        if (map.current) {
          map.current.scrollZoom.disable();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", handleBlur);
    }

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    points.forEach(point => {
      const latitude = parseFloat(point.latitude);
      const longitude = parseFloat(point.longitude);

      const newMarker = new maptilersdk.Marker({
        color: "#476488",
      })
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      newMarker.getElement().addEventListener('click', () => {
        map.current.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          speed: 1.2,
          curve: 1.42,
          essential: true
        });

        onMarkerClick(point);
      });

      markers.current.push(newMarker);
    });

    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        map.current.remove();
        map.current = null;
      }
    };
  }, [points, onMarkerClick]);

  // Efecto para centrado en marcador
  useEffect(() => {
    if (centerOnPoint && map.current) {
      const latitude = parseFloat(centerOnPoint.latitude);
      const longitude = parseFloat(centerOnPoint.longitude);

      map.current.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        speed: 1.2,
        curve: 1.42,
        essential: true
      });
    }
  }, [centerOnPoint]);

  // NUEVO efecto para cambiar estilo del mapa dinámicamente
  useEffect(() => {
    if (map.current && mapStyle) {
      map.current.setStyle(`https://api.maptiler.com/maps/${mapStyle}/style.json?key=${maptilersdk.config.apiKey}`);
    }
  }, [mapStyle]);


  return (
    <div className="map-container relative">
      {/* NUEVO: Selector de vista del mapa */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 flex gap-3 text-xl bg-white rounded-full px-4 py-2 shadow-lg">
        {styles.map(({ id, emoji }) => (
          <button
            key={id}
            onClick={() => setMapStyle(id)}
            title={id} // Mostrar en hover
            aria-label={`Cambiar vista a ${id}`}
            className={`transition-transform duration-200 hover:scale-125 ${mapStyle === id
                ? "text-blue-600 scale-125"
                : "text-gray-500 hover:text-blue-400"
              }`}
          >
            {emoji}
          </button>
        ))}
      </div>



      {/* Mapa */}
      {points.length > 0 ? (
        <div ref={mapContainer} style={{ width: '100%', height: '650px' }}></div>
      ) : (
        <div ref={mapContainer} style={{ width: '100%', height: '650px' }}></div>
      )}
    </div>
  );
}

