const {
  clasificarPrioridad
} = require("../utils/helpers");

// "Base de datos"
const incidencias = [];
let siguienteId = 1;

// POST /incidencias
function registrarIncidencia(req, res) {
  
}

// GET /incidencias
function listarIncidencias(req, res) {

}

// GET /incidencias/:id
function buscarIncidenciaPorId(req, res) {

}

// PUT /incidencias/:id/estado
function cambiarEstadoIncidencia(req, res) {

}

// DELETE /incidencias/:id
function eliminarIncidencia(req, res) {

}

// GET /estadisticas
function obtenerEstadisticas(req, res) {
  const totalIncidencias = incidencias.length;
  const pendientes = incidencias.filter((inc) => inc.estado === "Pendiente").length;
  const enProceso = incidencias.filter((inc) => inc.estado === "En Proceso").length;
  const resueltas = incidencias.filter((inc) => inc.estado === "Resuelta").length;
  const canceladas = incidencias.filter((inc) => inc.estado === "Cancelada").length;

  res.json({ totalIncidencias, pendientes, enProceso, resueltas, canceladas });
}

// GET /incidencias/:id/clasificacion
function clasificarIncidencia(req, res) {
  const id = Number(req.params.id);
  const incidencia = incidencias.find((inc) => inc.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  res.json({
    id: incidencia.id,
    clasificacion: clasificarPrioridad(incidencia.prioridad),
  });
}

module.exports = {
  registrarIncidencia,
  listarIncidencias,
  buscarIncidenciaPorId,
  cambiarEstadoIncidencia,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia,
};
