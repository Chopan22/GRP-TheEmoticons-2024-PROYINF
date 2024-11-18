const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');


const pacientesRoutes = require('./routes/pacientes');
const usuariosRoutes = require('./routes/usuarios');

// Crea la app express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});



app.use('/api/pacientes', pacientesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Conectarse a la BD 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Se conectó a la base de datos y ahora escuchando en el puerto", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
