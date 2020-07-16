// Importamos los modelos necesarios
const Solicitud = require('../models/solicitud').Solicitud
const Amigo = require('../models/amigo').Amigo
const Usuario = require('../models/usuario').Usuario
const sToken = require('../services/sTokens')
// 0= enviada, 1=aceptada , 2=rechazada

//se crea una solicitud status = 0
function enviarSolicitud(req, res){
    var solicitud = new Solicitud({
        id_sender: req.userId,
        id_receiver: req.body.id_receiver,
        status: 0
    })
    solicitud.save(function (err, doc) {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(400).send(err)
        }        
    })
}


//por sia  se necesita eliminar
function eliminarSolicitud(req, res){
    Solicitud.findByIdAndDelete(req.params.id, function(err, doc){
        if(!err){
            return res.status(200).send({
                message: 'Solicitud eliminada',
                solicitudRemoved: doc
            })
        }else{
            return res.status(400).send({message: err.message})
        }
    })
}
function consultarSolicitudes2(req, res){
    Solicitud.find({ $and: [{  $or: [{id_sender: req.params.id_sender}, {id_sender: req.params.id_receiver}],$or: [{id_receiver: req.params.id_sender}, {id_receiver: req.params.id_receiver}] }, {status:0}]  }, function(err, solicitud) {
        if(!err) {
            return res.status(200).send(solicitud)
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}
    
//busca las solicitudes que tiene pendiente, que sea para e y este activa es decir cero
//id es e de  acomodar a unir
function consultarSolicitudes(req, res){
    console.log("api")
    console.log(req.userId)
    Solicitud.find({ id_receiver: req.userId, $and: [{status: 0}]
    }).populate([ 'id_sender']).exec(function (err, solicitudes) {
        if (!err) {
            return res.status(200).send(solicitudes.map(function (item) {
                return item;
            }));
            
        } else {
            return res.status(400).send({message: err.message})
        }
    })
    
    
}
//Acepta amistad , lo cual cambia estado de solicitud a aceptada y crea amistad
async function aceptarSolicitud(req, res){
    
    console.log("api de aceptar");
    console.log(req.params.id);
    var solicitud= {}
    try {
        solicitud = await Solicitud.findById(req.params.id).exec()
        if (!solicitud) {
            return res.status(400).send({ message: 'La solicitud no existe existe' })
        }else{
            if(solicitud.status==0){
                solicitud.status = 1
                await solicitud.save()

                var amigo = new Amigo({
                    id_sender: solicitud.id_sender,
                    id_receiver: solicitud.id_receiver
                })
                amigo.save(function (err, doc) {
                    if (!err) {
                        return res.status(200).json(doc)
                    } else {
                        return res.status(400).send(err)
                    }        
                })
            }else{
                return res.status(400).send({message :"no te proceso nada y que"})
            }
            
            
        }
    } catch (e) {

        return res.status(400).send({ message: e.message })
        
    }
}
//Cancela solicitud
async function rechazarSolicitud(req, res){
    console.log("api de rechazar");
    var solicitud= {}
    try {
        solicitud = await Solicitud.findById(req.params.id).exec()
        if (!solicitud) {
            return res.status(400).send({ message: 'La solicitud no existe' })
        }else{
            solicitud.status = 2
            await solicitud.save()
            return res.status(200).send({ message: 'Ha rechazado amistad' })
        }
    } catch (e) {
        return res.status(400).send({ message: e.message })
    }
}
// carga e consutar
function getUsuarios(req, res) {
    Usuario.find({}, function(err, usuarios) {
        if(!err) {
            return res.status(200).send(usuarios)
        } else {
            return res.status(400).send({message: err.message})
        }
    })
}
function buscador(req, res) {
    console.log(req.query.token)
    console.log(req.query.val)
    var regex = new RegExp(req.query.val, "i")
    ,   query = { nombre: regex };

    Usuario.find(query).lean().exec(function(err, usuarios) {
        if(!err) {
            //Solicitud.find({status: {$in:[0,1,2]}},function(err2,  solicitudes){
            Solicitud.find({ $or: [{id_receiver: req.query.token},
                {$or: [{id_sender: req.query.token}]}], $and: [{status: {$in:[0,1,2]}}] },function(err2,  solicitudes){
                if(!err2){
                    var id_solicitud = solicitudes.reduce(function (resultado, solicitud) {
                        resultado[solicitud.id_sender.toString()] = {
                            sender: true,
                            status: solicitud.status,
                            id_solicitud: solicitud._id
                        };
                        resultado[solicitud.id_receiver.toString()] = {
                            sender: false,
                            status: solicitud.status,
                            id_solicitud: solicitud._id
                        };
                        return resultado;
                    }, {});
                    var respuesta = usuarios.map(function (usuario) {
                        usuario.estado_solicitud = (id_solicitud[usuario._id.toString()] || {status: -1}).status;
                        usuario.sender = (id_solicitud[usuario._id.toString()] || {sender: null}).sender;
                        usuario.id_solicitud = (id_solicitud[usuario._id.toString()] || {id_solicitud: null}).id_solicitud;
                        
                        return usuario
                    })//.filter((usuario) => usuario.estado_solicitud >= 0  && usuario.estado_solicitud <=2);
                    
                    return res.status(200).send(respuesta);
                }else {
                    return res.status(400).send({message: err2.message})
                }
            });
        } else {
            return res.status(400).send({message: err.message});
        }
    });
}
module.exports = {
    enviarSolicitud,
    eliminarSolicitud,
    consultarSolicitudes,
    consultarSolicitudes2,
    aceptarSolicitud,
    rechazarSolicitud,
    getUsuarios,
    buscador
}