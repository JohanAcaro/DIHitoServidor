const express = require('express');
const router = express.Router();
const connection = require('../database/Conexion');


// Ruta raiz
// Enviar un mensaje de bienvenida como json
router.get('/', (req, res) => {
    res.send({ message: 'Bienvenido a la API de Juego de Tronos' });
});




// Metodos HTTP - CRUD
// GET: Obtener datos
// Obtener todos los productos de la base de datos
router.get('/listar', (req, res) => {
    connection.query('SELECT * FROM personaje', (err, rows, fields) => {
        if (!err) {
        res.send(rows);
        } else {
        console.log(err);
        }
    });
});

// POST: Crear datos
router.post("/insertar", (req, res) => {
    const { nombre, casa, edad, titulo } = req.body;
    const sql = `INSERT INTO personaje (Nombre, Casa, Edad, Titulo) VALUES (?, ?, ?, ?)`;
    const values = [nombre, casa, edad, titulo];
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.send({ message: "Personaje añadido correctamente." });
    });
});
// PUT: Actualizar datos
router.put("/editar/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, casa, edad, titulo } = req.body;
    const sql = `UPDATE personaje SET Nombre = ?, Casa = ?, Edad = ?, Titulo = ? WHERE ID = ?`;
    const values = [nombre, casa, edad, titulo, id];
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.send({ message: "Personaje actualizado correctamente." });
    });
});
// DELETE: Eliminar datos
router.delete("/eliminar/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM personaje WHERE ID = ?`;
    const values = [id];
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.send({ message: "Personaje eliminado correctamente." });
    });
});

module.exports = router;