
const Conversacion = require('../models/conversacion')

function getConversacion (req, res)
{
    Conversacion.findById(req.params.id, function(err, conver) {
        if(!err) {
            if(conver) {
                return res.status(200).send(conver)
            } else {
                return res.status(400).send({message: 'Conversacion no encontrada'})
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

function getConversaciones(req, res) {

        let conversacionB1 = req.userId
        

    Conversacion.find({$or: [ { id_receiver: conversacionB1  }, { id_sender: conversacionB1  } ]}, function(err, conver) {
        if(!err) {
            return res.status(200).send(conver)
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}


async function actualizarConversacion (req, res)
{
    var conversacion = {}
    try {
        conversacion = await conversacion.findById(req.params.id).exec()

        if (!conversacion) {
            return res.status(400).send({ message: 'El id de la conversacion no existe' })
        }

        conversacion.id = req.body.id
        await conversacion.save()
        return res.status(400).send({ message: 'Conversacion modificada con exito' })

    } catch (e) {

        return res.status(400).send({ message: e.message })
        
    }
}

function eliminarConversacion(req, res)
{
    let conversacionId = req.params.conversacionId

    Conversacion.findById(conversacionId, (err) => {
        if(err) res.status(500).send({message: 'Error al Borrar La Conversacion'})
    
        Mensaje.remove(err => {
            if(err) res.status(500).send({message: 'Error al Borrar La Conversacion'})
            res.status(200).send({message: 'La Conversacion ha sido eliminada'})

        })
    })
}


async function guardarConversacion (req, res)
{
    
    console.log(req.body)
    var conversacion

     conversacion = new Conversacion({
        id_sender : req.userId,
        id_receiver : req.body.id_receiver
        });
         
    Conversacion.find({ $or: [{id_sender: req.userId, id_receiver: req.body.id_receiver}, {id_receiver: req.userId, id_sender: req.body.id_receiver}]})
                .exec( function(err, doc) {

                    if(err) {
                        return res.status(400).send({ message: err.message})
                    }
                    console.log(doc)
                    if(doc.length !== 0) {
                        return res.status(200).send({ CODE_ERROR: '0010', conv: doc})
                    }
 
                    conversacion.save(function(err, conv) {
                        if(err) {
                            return res.status(400).send({message: err.message})
                        }
                        return res.status(200).send({message: "Conversacion Guardada exitosamente", doc: conv})
                    })
                })


};


module.exports = {
    getConversacion,
    actualizarConversacion,
    eliminarConversacion,
    guardarConversacion,
    getConversaciones
};
