const Usuario = require('../models/UsuarioModel')

// Logear a un usuario

const loginUsuario = async (req, res) => {
    res.json({mssg: 'usuario logeado'})
}

// Añadir a un usuario
const signupUsuario = async (req, res) => {

    const {rut_doctor, nombre, apellido, sexo, email, password, specialization} = req.body

    try {
        const user = await Usuario.signup(rut_doctor, nombre, apellido, sexo, email, password, specialization)

        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {signupUsuario, loginUsuario}