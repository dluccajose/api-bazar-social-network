// Modelos necesarios
const Usuario = require('../models/usuario').Usuario
const Estado = require('../models/estado').Estado
const bcrypt = require('bcrypt')
const sToken = require('../services/sTokens')


// Devuelve solo la informacion publica de un usuario
function getUsuarioPublic(req, res) {

    Usuario.findById(req.params.id, function(err, user) {

        if(err) {
            return res.status(400).send({ message: err.message})
        }

        if(!user) {
            return res.status(404).send({ message: 'El usuario no existe'})
        }
        return res.status(200).send(user)
    }).select('-password').populate('id_estado')
}

async function registrarUsuario(req, res) {

    try {
        var estado = await Estado.findById(req.body.idEstado)
        var usuario = await Usuario.find({email: req.body.email})
    } catch (e) {
        return res.status(400).send({ message: e.message})
    }
    
    if(!estado) {
        return res.status(400).send({ message: 'El id del Estado no es valido'})
    }

    if(usuario.length !== 0) {
        return res.status(400).send({ code: 'UserAlreadyExists', message: 'El correo ya pertenece a una cuenta'})
    }

    // Hasheamos el password
    try {
        var hash = bcrypt.hashSync(req.body.password, 10)
    } catch (e) {
        return res.status(400).send({ message: e.message})
    }
    

    var usuario = new Usuario({
        email: req.body.email,
        password: hash,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        tipo: 1,                            // 1 - Usuario normal, no administrador
        cedula: req.body.cedula,
        fecha_nac: req.body.fechaNac,
        fecha_registro: Date.now(),
        id_estado: req.body.idEstado,
        ciudad: req.body.ciudad,
        status: 1
    })

    usuario.save( function(err, doc) {

        if(!err) {
            return res.status(200).send({ message: 'Usuario registrado correctamente'})
        } else {
            return res.status(400).send({ message: err.message})
        }
    })
}
//Actualiza la foto del perfil
async function cambiarFoto(req, res){
    Usuario.findByIdAndUpdate(req.userId, req.body, function(err, usuario){
        if(!err){
            return res.status(200).send({message: 'Imaagen modificada con exito'})
        } else {
            return res.status(400).send({message: 'No se pudo guardar'})
        }
    });
}
async function modificarUsuario(req, res) {

    var usuario = {}
    var estado = {}

    try {
        usuario = await  Usuario.findById(req.userId)
        estado = await Estado.findById(req.body.idEstado)
    } catch (e) {
        return res.status(400).send({ message : e.message})
    }

    // Verificamos que el estado exista
    if(!estado) {
        return res.status(400).send({ message : 'ID de estado no valido'})
    }

    // Verificamos que los campos no esten vacios
    if(!req.body.idEstado || !req.body.ciudad  || !req.body.email) {
        return res.status(400).send({ message: 'Faltan campos por enviar en la peticion'})
    }

    // Informacion del usuario que puede ser modificada
    usuario.email = req.body.email
    usuario.id_estado = req.body.idEstado
    usuario.ciudad = req.body.ciudad
    if(req.body.password!=""){
    usuario.password = bcrypt.hashSync(req.body.password,10)
    }
    
    // Actualizamos la informacion
    usuario.save(function(err, doc) {
        if(!err) {
            return res.status(200).send({message: 'Usuario modificado con exito'})
        } else {
            return res.status(400).send({ message: 'no se guardo'})
        }
    })

}

function desactivarUsuario(req, res) {

    Usuario.findById(req.params.id, function(err, usuario) {

        if(!err) {
            // Verificamos que el usuario existe
            if(usuario) {
                usuario.status = 0
                usuario.save(function(err) {
                    if(!err) {
                        return res.status(200).send({ message: 'Usuario desactivado correctamente'})
                    } else {
                        return res.status(400).send({ message: err.message})
                    }
                })
            } else {
                return res.status(400).send({ message: 'ID de usuario no valido'})
            }
        } else {
            return res.status(400).send({ message: err.message})
        }
    })
}

function activarUsuario(req, res) {

    Usuario.findById(req.params.id, function(err, usuario) {

        if(!err) {
            // Verificamos que el usuario existe
            if(usuario) {
                usuario.status = 2
                usuario.save(function(err) {
                    if(!err) {
                        return res.status(200).send({ message: 'Usuario activado correctamente'})
                    } else {
                        return res.status(400).send({ message: err.message})
                    }
                })
            } else {
                return res.status(400).send({ message: 'ID de usuario no valido'})
            }
        } else {
            return res.status(400).send({ message: err.message})
        }
    })
}

function login(req,res) {
    
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Debe mandar correo y password'})
    }

    // Buscamos el email del usuario
    Usuario.findOne({email: req.body.email}, function(err, usuario) {
        console.log(usuario)
        if(err) {
            return res.status(400).send({ message: err.message})
        }

        if(!usuario) {
            return res.status(404).send({ message: 'El email no se encuentra en la base de datos'})
        }

        // Verificamos el password
        if(!bcrypt.compareSync(req.body.password, usuario.password)) {
            return res.status(400).send({ message: 'El password es incorrecto'})
        }

        // Devolvemos el token de acceso
        return res.status(200).send({ token: sToken.createToken(usuario), usuario: usuario})

    })
}

module.exports = {
    cambiarFoto,
    registrarUsuario,
    modificarUsuario,
    desactivarUsuario,
    activarUsuario,
    login,
    getUsuarioPublic
}
