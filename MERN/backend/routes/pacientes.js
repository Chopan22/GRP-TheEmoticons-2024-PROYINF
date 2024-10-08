const express = require('express')
const Paciente = require('../models/PacienteModel')
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const {
    getPaciente,
    getPacientes,
    crearPaciente,
    borrarPaciente,
    modificarPaciente
} = require('../controllers/pacienteController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Autenticacion para mostrar todos los pacientes
router.use(requireAuth)

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

// DICOM
router.post('/upload', upload.single('archivo'), async (req, res) => {
    try {
        const pacienteId = req.body.pacienteId;

        if (!req.file) {
            return res.status(400).json({ error: 'No se ha subido ningún archivo.' });
        }

        const archivoPath = req.file.path; 

        const paciente = await Paciente.findById(pacienteId);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        paciente.archivo = archivoPath; 
        await paciente.save();

        res.status(200).json({ message: 'Archivo subido exitosamente', path: archivoPath });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router
