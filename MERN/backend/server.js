const express = require('express')
require('dotenv').config()
const cors = require('cors')
// console.log(process.env.MONGO_URI)

// Conexion a la base de datos 
const mongoose = require('mongoose')


const loginRoutes = require('./routes/pacientes')


// Crea la app express
const app = express()

// MiddleWare
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use('/api/pacientes',loginRoutes)
// Conectarse a la BD 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Se conecto a la base de datos y ahora Escuchando en el puerto 4000");
        })
    })
    .catch((error) => {
        console.log(error)
    })

// Escuchando llamadas

