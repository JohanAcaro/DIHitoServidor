const express = require('express');
const mysql = require('mysql2');


// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'curso',
});

connection.connect(err => {
    if (err) throw err;
    console.log("Conectado a MySQL como root.");
  
    createDatabase();
    
  
    connection.changeUser({database: "juego_tronos"}, err => {
        if (err) throw err;
        console.log("Conectado a la base de datos juego_tronos.");
        createTables();
        insertData();
        
    });
});



// Crear la base de datos si no existe
const createDatabase = () => {
    connection.query(`CREATE DATABASE IF NOT EXISTS juego_tronos`, (err, result) => {
        if (err) throw err;
        console.log(`La base de datos juego_tronos se ha creado correctamente.`);
        console.log("Resultado: ",result);
    });
};

const createTables = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS personaje (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            Nombre VARCHAR(100) NOT NULL,
            Casa VARCHAR(25) NOT NULL,
            Edad INT NOT NULL,
            Titulo VARCHAR(100) NOT NULL
        );
    `;
  
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(`La tabla personaje se ha creado correctamente.`);
        console.log("Resultado: ",result);
    });
};


const insertData = () => {
    connection.query("SELECT * FROM personaje", (err, result) => {
    if (err) {
        if (err.code === "ER_NO_SUCH_TABLE") {
            console.log("La tabla personaje no existe. No se pueden insertar datos.");
        } else {
            throw err;  
        }
    } else {
        if (result.length === 0) {
            console.log("La tabla personaje está vacía. Insertando datos...");
            const sql = `
                INSERT INTO personaje (Nombre, Casa, Edad, Titulo)
                VALUES
                    ('Ned Stark', 'Stark', 35, 'Señor de Invernalia'),
                    ('Daenerys Targaryen', 'Targaryen', 20, 'Madre de Dragones'),
                    ('Tyrion Lannister', 'Lannister', 40, 'Mano del Rey'),
                    ('Jon Snow', 'Snow', 25, 'Rey en el Norte'),
                    ('Arya Stark', 'Stark', 17, 'Asesina'),
                    ('Bran Stark', 'Stark', 18, 'Brujo de la Cuarta'),
                    ('Sansa Stark', 'Stark', 18, 'Señora de Invernalia'),
                    ('Jaime Lannister', 'Lannister', 41, 'Matarreyes'),
                    ('Jorah Mormont', 'Mormont', 49, 'Caballero'),
                    ('Theon Greyjoy', 'Greyjoy', 28, 'Príncipe de las Islas del Hierro'),
                    ('Cersei Lannister', 'Lannister', 30, 'Reina'),
                    ('Joffrey Baratheon', 'Baratheon', 18, 'Rey Joffrey'),
                    ('Petyr Baelish', 'Baelish', 40, 'Jardinero'),
                    ('Stannis Baratheon', 'Baratheon', 50, 'Reivindicador'),
                    ('Davos Seaworth', 'Seaworth', 45, 'Mano de Baratheon');
            `;
            connection.query(sql, (err, result) => {
                if (err) throw err;
                console.log("Datos insertados correctamente.");
            });
        } else {
            console.log("La tabla persoanaje ya contiene datos.");
        }
    }});
};

module.exports = connection;
