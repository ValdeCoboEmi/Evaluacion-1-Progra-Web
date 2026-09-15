const {
  clasificarPrioridad
} = require("../utils/helpers");

// "Base de datos"
const incidencias = [];
let siguienteId = 1;

// POST /incidencias
function registrarIncidencia(req, res) {
  const {empleado, area, descripcion, prioridad} = req.body;

  // Se valida que todos los campos existan
  if (empleado === undefined || area === undefined || descripcion === undefined || prioridad === undefined) {
    return res.status(400).json({mensaje: "Todos los campos son obligatorios"});
  }

  // Se valida que no existan cadenas vacias
  if (empleado.trim === "" || area.trim === "" || descripcion.trim === "" || prioridad.trim === "") {
    return res.status(400).json({mensaje: "No se permiten campos vacios"});
  }

  // Se verifica la prioridad
  if (prioridad !== "Alta" && prioridad !== "Media" && prioridad !== "Baja") {
    return res.status(400).json({mensaje: "La prioridad debe ser: Alta, Media o Baja"});
  }

  // Se crea la incidencia
  const nuevaIncidencia = {
    id: siguienteId,
    empleado,
    area,
    descripcion,
    prioridad,
    estado: "Pendiente"
  };

  // Se guarda la incidencia en un arreglo
  incidencias.push(nuevaIncidencia);

  // Se prepara el siguiente ID
  siguienteId++;

  // Respuesta sobre el estado final
  res.status(201).json({mensaje: "Incidencia registrada correctamente"});
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
