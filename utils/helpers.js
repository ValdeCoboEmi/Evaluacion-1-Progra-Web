// Clasifica una incidencia segun su prioridad
function clasificarPrioridad(prioridad) {
  let clasificacion;

  switch (prioridad) {
    case "Alta":
      clasificacion = "Crítica";
      break;
    case "Media":
      clasificacion = "Importante";
      break;
    case "Baja":
      clasificacion = "Normal";
      break;
    default:
      clasificacion = "Sin clasificar";
  }

  return clasificacion;
}

module.exports = {
  clasificarPrioridad,
};
