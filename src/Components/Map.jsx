import { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './Map.css';

export default function Map({latitud, longitud}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const coords = { lng: longitud, lat: latitud };
    const zoom = 14;
    maptilersdk.config.apiKey = 'bmHH9ekzKdndbQ2GrZEm';
    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once
      
        map.current = new maptilersdk.Map({
          container: mapContainer.current,
          style: maptilersdk.MapStyle.STREETS,
          center: [coords.lng, coords.lat],
          zoom: zoom
        });
        new maptilersdk.Marker({color: "#FF0000"})
        .setLngLat([longitud,latitud])
        .addTo(map.current);
      }, [coords.lng, coords.lat, zoom]);


      return (
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
        </div>
      );
  }
  