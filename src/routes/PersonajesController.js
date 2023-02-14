const express = require('express');
const router = express.Router();
const connection = require('../database/Conexion');
const bodyParser = require('body-parser');


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

// Parsea el body de la petición a JSON
router.use(bodyParser.json());

// POST: Crear datos
router.post("/insertar", (req, res) => {
  const { id, nombre, casa, edad, titulo } = req.body;
  const sql = 'INSERT INTO personaje (ID, Nombre, Casa, Edad, Titulo) VALUES (?,?, ?, ?, ?)';
  const values = [id, nombre, casa, edad, titulo];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al insertar el personaje' });
    } else {
      res.status(201).send({ message: 'Personaje añadido correctamente.' });
    }
  });
});

// Post: Actualizar datos
router.post("/editar", (req, res) => {
    const { id, nombre, casa, edad, titulo } = req.body;
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