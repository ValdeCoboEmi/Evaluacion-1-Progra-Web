const controlador = require("../controllers/incidenciasController");

// Recibe la instancia de "app" y define ahi todas las rutas
function registrarRutasIncidencias(app) {
  //Rutas de incidencias
  app.post("/incidencias", controlador.registrarIncidencia);
  app.get("/incidencias", controlador.listarIncidencias);
  app.get("/incidencias/:id/clasificacion", controlador.clasificarIncidencia);
  app.get("/incidencias/:id", controlador.buscarIncidenciaPorId);
  app.put("/incidencias/:id/estado", controlador.cambiarEstadoIncidencia);
  app.delete("/incidencias/:id", controlador.eliminarIncidencia);

  //Rutas de estadisticas
  app.get("/estadisticas", controlador.obtenerEstadisticas);
}

module.exports = registrarRutasIncidencias;
