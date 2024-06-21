const express = require('express')
const Paciente = require('../models/PacienteModel')
const {
    getPaciente,
    getPacientes,
    crearPaciente,
    borrarPaciente,
    modificarPaciente
} = require('../controllers/pacienteController')

const router = express.Router();


// Obtener todos los Pacientes
router.get('/', getPacientes) //FUNCIONA

// Obtener 1 Paciente
router.get('/:id', getPaciente) // Funciona

// Añadir a un pacientes
router.post('/', crearPaciente) // Funciona

// Borrar un paciente
router.delete('/:id', borrarPaciente) //FUNCIONA

// Actualizar a un paciente
router.patch('/:id', modificarPaciente)

module.exports = router