const Paciente = require('../models/PacienteModel')
const mongoose = require('mongoose')


// Obtener todos los pacientes
const getPacientes = async (req, res) => {
    const pacientes = await Paciente.find({}).sort({createdAt: -1});

    res.status(200).json(pacientes)
}


// Obtener a solo 1 paciente
const getPaciente = async (req, res) => {
    const {id} = req.params

    const paciente = await Paciente.findById(id)

    if (!paciente){
        return res.status(400).json({error: "No existe el paciente"})
    }

    res.status(200).json(paciente);
}


// Agregar un nuevo paciente
const crearPaciente = async(req ,res) => {
    const {nombre, rut, fecha_nacimiento, sexo, telefono, doctor_rut, en_tratamiento} = req.body

    // Añadir el paciente a la BD
    try {
        const paciente = await Paciente.create({nombre, rut, fecha_nacimiento, sexo, telefono, doctor_rut, en_tratamiento})
        res.status(200).json(paciente)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// Borrar un paciente
const borrarPaciente = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No existe ese paciente"})
    }

    const paciente = await Paciente.findOneAndDelete({_id: id})

    if (!paciente) {
        return res.status(400).json({error: "No existe ese paciente"})
    }

    res.status(200).json(paciente)
}

// Actualizar datos de un paciente
const modificarPaciente= async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No existe ese paciente"})
    }

    const paciente = await Paciente.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!paciente) {
        return res.status(400).json({error: "No existe ese paciente"})
    }

    res.status(200).json(paciente)
}


module.exports = {
    crearPaciente,
    getPacientes, 
    getPaciente,
    borrarPaciente,
    modificarPaciente
}