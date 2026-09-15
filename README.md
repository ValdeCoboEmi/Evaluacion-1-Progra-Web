# API de Incidencias - TechSupport S.A.

API REST hecha con **Express** y **Node.js** 
## Instalación y ejecución

```bash
npm install
npm start
```

El servidor queda escuchando en `http://localhost:3000`.

## Estructura del proyecto

```
incidencias-api/
├── app.js                          # Configura Express y arranca el servidor
├── routes/
│   └── incidencias.js              # Define las rutas: URL + metodo HTTP -> controlador
├── controllers/
│   └── incidenciasController.js    # Logica de negocio: validaciones y el arreglo en memoria
├── utils/
│   └── helpers.js                  # Funciones reutilizables: validar, normalizar, clasificar
└── package.json
```

## Endpoints

| Método | Ruta                              | Descripción                            |
|--------|------------------------------------|-----------------------------------------|
| POST   | `/incidencias`                    | Registra una nueva incidencia            |
| GET    | `/incidencias`                    | Lista todas las incidencias              |
| GET    | `/incidencias/:id`                | Busca una incidencia por id              |
| PUT    | `/incidencias/:id/estado`         | Cambia el estado de una incidencia       |
| DELETE | `/incidencias/:id`                | Elimina una incidencia                   |
| GET    | `/estadisticas`                   | Totales de incidencias por estado        |
| GET    | `/incidencias/:id/clasificacion`  | Clasifica la incidencia según prioridad  |

### Ejemplo: registrar una incidencia

```
POST /incidencias
Content-Type: application/json

{
  "empleado": "Juan Perez",
  "area": "Contabilidad",
  "descripcion": "No puedo imprimir documentos",
  "prioridad": "Alta"
}
```

Respuesta (201):
```json
{ "mensaje": "Incidencia registrada correctamente" }
```

Si falta un campo, viene vacío, o la prioridad no es Alta/Media/Baja, responde 400 con un `mensaje` explicando cuál es el problema.

### Ejemplo: cambiar estado (requiere switch)

```
PUT /incidencias/1/estado
Content-Type: application/json

{ "estado": "Resuelta" }
```

Estados válidos: `Pendiente`, `En Proceso`, `Resuelta`, `Cancelada`.

### Ejemplo: clasificación automática (switch exclusivamente)

```
GET /incidencias/1/clasificacion
```
```json
{ "id": 1, "clasificacion": "Crítica" }
```
`Alta -> Crítica`, `Media -> Importante`, `Baja -> Normal`.

