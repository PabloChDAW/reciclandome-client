// src/utils/translations.js

export function translateToSpanish(value, type) {
  if (!value) return "—";
  
  // Traducciones para place_type
  if (type === "place_type") {
    switch (value) {
      case "address": return "Dirección";
      case "road": return "Carretera";
      case "municipal_district": return "Distrito municipal";
      case "locality": return "Localidad";
      case "municipality": return "Municipio";
      case "region": return "Región";
      case "country": return "País";
      case "postcode": return "Código postal";
      case "place": return "Lugar genérico";
      default: return value;
    }
  }
  
  // Traducciones para way
  if (type === "way") {
    switch (value) {
      case "road": return "Carretera";
      case "street": return "Calle";
      case "admin_area": return "Área administrativa";
      case "subregion": return "Subregión";
      case "county": return "Subregión";
      case "place": return "Lugar genérico";
      case "continental_marine": return "Marino continental";
      default: return value;
    }
  }
  
  return value;
}