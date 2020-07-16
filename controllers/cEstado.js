// Importamos los modelos necesarios
const Estado = require('../models/estado').Estado
const Usuario = require('../models/usuario').Usuario
const sToken = require('../services/sTokens')


// Agregar Estado
function agregarEstado(req, res) {

    var estado = new Estado({
        nombre: req.body.nombre
    })

    // Guardamos el estado en la base de datos
    estado.save(function (err, doc) {
        if (!err) {
            return res.status(200).send({status: 'ok', message: 'Estado agregado correctamnete'})
        } else {
            return res.status(400).send(err)
        }
    })

}

function getAllEstados(req, res) {

    Estado.find({}, function(err, estados) {
        if(!err) {
            return res.status(200).send(estados)
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

function getEstado(req, res) {

    Estado.findById(req.params.id, function(err, estado) {
        if(!err) {
            if(estado) {
                return res.status(200).send(estado)
            } else {
                return res.status(400).send({message: 'Estado no encontrado'})
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

function eliminarEstado(req, res) {

    Estado.findByIdAndDelete(req.params.id, function(err, doc) {

        if(!err) {
            return res.status(200).send({
                message: 'Estado eliminado',
                estadoRemoved: doc
            })
        } else {
            return res.status(400).send({ message: err.message})
        }
    })

}


async function modificarEstado(req, res) {
    var estado = {}
    try {
        estado = await Estado.findById(req.params.id).exec()

        if (!estado) {
            return res.status(400).send({ message: 'El id del estado no existe' })
        }

        estado.nombre = req.body.nombre
        await estado.save()
        return res.status(400).send({ message: 'Estado modificado con exito' })

    } catch (e) {

        return res.status(400).send({ message: e.message })
        
    }
}

module.exports = {
    agregarEstado,
    modificarEstado,
    eliminarEstado,
    getEstado,
    getAllEstados
}