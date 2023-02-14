const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Configuración
app.use(cors({ origin: 'http://localhost:8100' }));

// Rutas
app.use('/api/personajes', require('./routes/PersonajesController'));

// Escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`La API se está ejecutando en el puerto ${port}`);
});