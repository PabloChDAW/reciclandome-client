import React from 'react';

const InfoBox = ({ point }) => {
  if (!point) return null; // No mostrar nada si no hay punto seleccionado
  return (
    <div className="info-box">
      <h3>Punto de Reciclaje</h3>
      <p>ID: {point.id}</p>
      <p>Usuario: {point.user_id}</p>
      <p>Fecha: {point.created_at}</p>
      <p>Coordenadas: {point.latitude}, {point.longitude}</p>
      <p>Teléfono: {point.phone}</p>
      <p>Correo: {point.email}</p>
      <p>Tipo de punto: {point.point_type}</p>
      <p>Tipo de lugar: {point.place_type}</p>
      <p>Dirección: {point.address}</p>
      <p>Localidad:{point.city}</p>
      <p>Región:{point.region}</p>
      <p>País:{point.country}</p>
      <p>Código postal:{point.postcode}</p>
      <p>Vía: {point.way}</p>
      <p>Descripción: {point.description}</p>
      <p>Url: {point.url}</p>
    </div>
  );
};
export default InfoBox;

/**
 * TODO Incluir nuevos campos
 */