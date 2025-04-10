import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map({ latitud, longitud, onMapClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;

  maptilersdk.config.apiKey = 'eL1gisHdNkWv57C6vnT6';

  useEffect(() => {
    if (!latitud || !longitud || map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [longitud, latitud],
      zoom: zoom
    });

    // Manejar clics en el mapa
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      console.log("Click en:", lng, lat);

      // Si pasas una función onMapClick desde el padre, la llamamos
      if (onMapClick) {
        onMapClick({ lng, lat });
      }
    });
  }, [latitud, longitud, onMapClick]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
