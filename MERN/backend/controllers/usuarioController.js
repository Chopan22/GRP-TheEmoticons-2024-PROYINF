const Usuario = require('../models/UsuarioModel')

// Logear a un usuario

const loginUsuario = async (req, res) => {
    res.json({mssg: 'usuario logeado'})
}

// Añadir a un usuario
const signupUsuario = async (req, res) => {
    res.json({mssg: 'Usuario inscrito'})
}


module.exports = {signupUsuario, loginUsuario}