const Notificacion = require('../models/notificacion').Notificacion


function nuevaNotificacion(req, res) {

    var notificacion = new Notificacion({
        tipo_accion: req.body.tipoAccion,
        tipo_contenido: req.body.tipoContenido,
        ref_contenido: req.body.refContenido,
        id_sender: req.body.idSender,
        id_receiver: req.body.idReceiver,
        is_readed: 0,
        fecha: Date.now()
    })

    notificacion.save(function(err) {

        if(err) {
            return res.status(400).send({message: err.message})
        }

        return res.status(200).send({ message: 'Notificacion creada con exito'})

    })
}

function setAsReaded(req, res) {

    Notificacion.findById(req.params.id, function(err, noti) {

        if(err) {
            return res.status(400).send({message: err.message})
        }
        
        if(!noti) {
            return res.status(404).send({message: 'Id de notificacion no encontrado'})
        }

        noti.is_readed = 1
        noti.save(function(err) {

            if(err) {
                return res.status(400).send({message: err.message})
            }
            return res.status(200).send({ message: 'Notificacion marcada como leida'})
        })
    })
}


module.exports = {
    nuevaNotificacion,
    setAsReaded
}