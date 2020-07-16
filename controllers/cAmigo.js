// Importamos los modelos necesarios
const Amigo = require('../models/amigo').Amigo
const Usuario = require('../models/usuario').Usuario
const sToken = require('../services/sTokens')

//consultar mis amigos, donde se debe pasar e id de que esta autentificado
function consultarAmigos(req, res) {
    const id_consulta = req.params.id;
    Amigo.find({
        $or: [{id_receiver: id_consulta},
            {$or: [{id_sender: id_consulta}]}]
    }).populate(['id_receiver', 'id_sender']).exec(function (err, amigos) {
        if (!err) {
            return res.status(200).send(amigos.map(function (item) {
                if (item.id_receiver._id != id_consulta) {
                    item.id_sender = item.id_receiver
                }else{
                    item.id_sender =  item.id_sender
                }
                //return item;
                return item.id_sender;
            }));
            //trae a os amigos pero necesito os detalles de ese amigo
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

//ver amigo , es ir al perfil del amigo seleccionado
//se le debe enviar el id de ese usuario(amigo) que es 
function verAmigo(req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        if (!err) {
            if (usuario) {
                return res.status(200).send(usuario)
            } else {
                return res.status(400).send({message: 'no encontrado'})
            }
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

//elimina amistad entre ellos, se le debe enviar del id que
//identifique el registro del enlace de amistad para ser elimnado la amistad
function eliminarAmistad(req, res) {
    Amigo.findByIdAndDelete(req.params.id, function (err, doc) {
        if (!err) {
            if (doc) {
                return res.status(200).send({
                    message: 'Amistad eliminada',
                    amigoRemoved: doc
                })
            } else {
                return res.status(400).send("no se encontro")
            }
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}
function eliminarAmigo(req, res) {
    Amigo.find({ $and: [{  $or: [{id_sender: req.userId}, {id_sender: req.params.id_receiver}],$or: [{id_receiver: req.userId}, {id_receiver: req.params.id_receiver}] }] })
          .remove(function(err, doc) {
        if (!err) {
                    return res.status(200).send({
                     message: 'Amistad eliminada',
                    amigoRemoved: doc
                })
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}
module.exports = {
    eliminarAmigo,
    consultarAmigos,
    verAmigo,
    eliminarAmistad
}
