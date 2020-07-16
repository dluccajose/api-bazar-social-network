
const Mensaje = require('../models/mensajes')

function getMensaje(req, res)
{
    Mensaje.findById(req.params.id, function(err, conver) {
        if(!err) {
            if(conver) {
                return res.status(200).send(conver)
            } else {
                return res.status(400).send({message: 'Mensaje no encontrado'})
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

function getMensajes(req, res) {
    console.log(req.params.idm)
    conversacion = req.params.idm
   

Mensaje.find({ id_conversacion: conversacion }, function(err, conver) {
    if(!err) {
        return res.status(200).send(conver)
    } else {
        return res.status(400).send({message: err.message})
    }
}).populate(' id_usuario ')
}

async function actualizarMensaje (req, res)
{
    var mensaje = {}
    try {
        mensaje = await Mensaje.findById(req.params.id).exec()

        if (!mensaje) {
            return res.status(400).send({ message: 'El id del mensaje no existe' })
        }

        mensaje.id = req.body.id
        await mensaje.save()
        return res.status(200).send({ message: 'Mensaje modificado con exito' })

    } catch (e) {

        return res.status(400).send({ message: e.message })
        
    }
}

function eliminarMensaje(req, res)
{
    let mensajeId = req.params.mensajeId

    Mensaje.findById(mensajeId, (err) => {
        if(err) res.status(500).send({message: 'Error al Eliminar el Mensaje'})
    
        Mensaje.remove(err => {
            if(err) res.status(500).send({message: 'Error al Borrar el Mensaje'})
            res.status(200).send({message: 'Mensaje Eliminado Exitosamente'})

        })
    })
}


async function guardarMensaje (req, res)
{
    
    console.log(req.body)
    var mensaje

    mensaje = new Mensaje({
        id_usuario : req.body.id_usuario,
        id_conversacion : req.body.id_conversacion,
        contenido : req.body.contenido
        

        });
         
    

    mensaje.save(function(err, doc) {
        
        if(err) {
            return res.status(400).send({message: err.message})
        }

        return res.status(200).send({message: "Mensaje Guardado exitosamente"})

    })

};


module.exports = {
   actualizarMensaje,
   guardarMensaje,
   eliminarMensaje,
   getMensaje,
   getMensajes
};
