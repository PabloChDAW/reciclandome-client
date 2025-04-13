import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './Map3.css';

export default function Map3({points}){ //Aquí debes añadir como prop el evento onMarkerClick (clickar en chincheta)
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 4.5; //se puede ampliar a 14 cuando se tenga la funcionalidad del GPS
  const marker = useRef(null);
  maptilersdk.config.apiKey = 'bmHH9ekzKdndbQ2GrZEm';
  console.log('Estructura de points:', points);
  useEffect(() => {
    if(points && points.length>0){
        if(!map.current){
            map.current = new maptilersdk.Map({
                container: mapContainer.current,
                style: maptilersdk.MapStyle.STREETS,
                center: [-3.7038,40.4168], /** <-- Aquí no hace falta sanitización. El 0 es bien recibido, 
                supongo por las múltiples chinchetas
                * TODO <-- Estas pueden ser las coordenadas del GPS para centrarnos donde estamos y ver qué hay cerca
                */
                zoom: zoom
              });
        }
        points.forEach(point => {
            const latitude = parseFloat(point.latitude);
            const longitude = parseFloat(point.longitude);
            marker.current = new maptilersdk.Marker({
            color: "#4F46E5", 
            })
            .setLngLat([longitude, latitude])
            .addTo(map.current)
            // Este bloque de aquí añadiría el evento. ¡Tal vez quieras descomentarlo e investigar qué hace!
            // .on('click', () => {
            //     onMarkerClick(point); // Llama a la función pasada como prop
            //   });
            //   markers.current.push(marker); <-- Esto de aquí parece un estado, sabes como implementarlo, ¿Verdad?
        });
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [points]);


  return (
    <div>
      {points.length>0 ? (
        <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div>
      ) : (
        <p>Cargando mapa...</p>
      )}
    </div>
  );
}