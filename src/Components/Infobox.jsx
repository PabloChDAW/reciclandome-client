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
      {/* <p>Teléfono: {point.phone || "—"}</p>
      <p>Correo: {point.email || "—"}</p>
      <p>Tipo de punto: {}</p>
      <p>Tipo de lugar: {}</p>
      <p>Dirección: {}</p>
      <p>Localidad:{formData.city || "—"}</p>
      <p>Región:{}</p>
      <p>País:{}</p>
      <p>Código postal:{}</p>
      <p>Categoría: {formData.category || "—"}</p> */}
    </div>
  );
};
export default InfoBox;

/**
 * TODO Incluir nuevos campos
 */