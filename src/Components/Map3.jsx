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
      <div className="absolute top-4 left-32 sm:left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-2 py-1 gap-2 sm:px-6 sm:py-4 flex sm:gap-6 items-center text-sm font-medium text-gray-700">
        {/* Selector de vista */}
        <div className="flex flex-col">
          <label className="mb-1 text-xs text-gray-500">Vista del mapa</label>
          <select
            className="px-1 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={mapStyle}
            onChange={(e) => setMapStyle(e.target.value)}
          >
            <option value="streets">🛣️ Calles</option>
            <option value="satellite">🛰️ Satélite</option>
            <option value="hybrid">🌐 Híbrido</option>
          </select>
        </div>

        {/* Selector de reciclaje */}
        <div className="flex flex-col">
          <label className="mb-1 text-xs text-gray-500">Filtrar por reciclaje</label>
          <select
            className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="todos">♻️ Todos</option>
            <option value="papel">📄 Papel</option>
            <option value="vidrio">🍾 Vidrio</option>
            <option value="plastico">🧴 Plástico</option>
            <option value="organico">🍌 Orgánico</option>
          </select>
        </div>
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

