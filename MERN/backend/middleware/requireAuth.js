const jwt = require('jsonwebtoken')
const User = require('../models/UsuarioModel')

const requireAuth = async (req, res,  next) => {

    // Verificar que el usuario esta autenticado
    const { autorizacion } = req.headers

    if (!autorizacion) {
        return res.status(401).json({error: "Token de autorizacion requerido para seguir"})
    }

    const token = autorizacion.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select('_id')

        next()
    } catch (error){
        console.log(error)
        res.status(401).json({error: 'Solicitud no autorizada'})
    }

}

module.exports = requireAuth