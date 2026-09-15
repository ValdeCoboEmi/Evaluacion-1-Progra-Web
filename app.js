const express = require("express");
const registrarRutasIncidencias = require("./routes/incidencias");

const app = express();
const PUERTO = 3000;

// Middleware para poder leer JSON en el body de las peticiones (POST/PUT)
app.use(express.json());

// Registra todas las rutas del recurso 
registrarRutasIncidencias(app);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});

module.exports = app;
