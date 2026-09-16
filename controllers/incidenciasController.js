const {
  clasificarPrioridad
} = require("../utils/helpers");

// "Base de datos"
const incidencias = [];
let siguienteId = 1;

// POST /incidencias
function registrarIncidencia(req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

  // Se valida que todos los campos existan
  if (empleado === undefined || area === undefined || descripcion === undefined || prioridad === undefined) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  // Se valida que no existan cadenas vacias
  if (empleado.trim() === "" || area.trim() === "" || descripcion.trim() === "" || prioridad.trim() === "") {
    return res.status(400).json({ mensaje: "No se permiten campos vacios" });
  }

  //se normaliza la prioridad antes de validar para aceptar "alta", "Alta", "ALTA", etc
  const prioridadNormalizada = prioridad.trim().charAt(0).toUpperCase() + prioridad.trim().slice(1).toLowerCase();

  // Se verifica la prioridad
  if (prioridadNormalizada !== "Alta" && prioridadNormalizada !== "Media" && prioridadNormalizada !== "Baja") {
    return res.status(400).json({ mensaje: "La prioridad debe ser: Alta, Media o Baja" });
  }

  // Se crea la incidencia
  const nuevaIncidencia = {
    id: siguienteId,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: prioridadNormalizada,
    estado: "Pendiente"
  };

  // Se guarda la incidencia en un arreglo
  incidencias.push(nuevaIncidencia);

  // Se prepara el siguiente ID
  siguienteId++;

  // Respuesta sobre el estado final
  res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
}

// GET /incidencias
function listarIncidencias(req, res) {
  res.json(incidencias);
}

// GET /incidencias/:id
function buscarIncidenciaPorId(req, res) {
  const id = Number(req.params.id);
  const incidencia = incidencias.find((inc) => inc.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  res.json(incidencia);
}

// PUT /incidencias/:id/estado
function cambiarEstadoIncidencia(req, res) {
  const id = Number(req.params.id);
  const incidencia = incidencias.find((inc) => inc.id === id);

  // Si no existe, 404 antes de validar el body
  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  const { estado } = req.body;

  // Validar que el campo sea texto y no sea una cadena vacia
  if (typeof estado !== "string" || estado.trim() === "") {
    return res.status(400).json({ mensaje: "El campo estado es obligatorio" });
  }

  const estadoNormalizado = estado.trim();

  // Switch para validar el estado recibido
  let esValido;
  switch (estadoNormalizado) {
    case "Pendiente":
    case "En Proceso":
    case "Resuelta":
    case "Cancelada":
      esValido = true;
      break;
    default:
      esValido = false;
  }

  if (!esValido) {
    return res.status(400).json({
      mensaje: "Estado invalido. Los estados permitidos son: Pendiente, En Proceso, Resuelta, Cancelada.",
    });
  }

  incidencia.estado = estadoNormalizado;

  res.json({
    mensaje: "Estado actualizado correctamente",
    incidencia,
  });
}

// DELETE /incidencias/:id
function eliminarIncidencia(req, res) {
  const id = Number(req.params.id);

  // findIndex y splice para eliminar del arreglo
  const indice = incidencias.findIndex((inc) => inc.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  const [incidenciaEliminada] = incidencias.splice(indice, 1);

  res.json({
    mensaje: "Incidencia eliminada correctamente",
    incidencia: incidenciaEliminada,
  });
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