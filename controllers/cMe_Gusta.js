const Me_Gusta = require('../models/me_gusta').Me_Gusta
const sToken = require('../services/sTokens')

function agregarMeGusta (req, res) {
    var me_gusta = new Me_Gusta({
        id_usuario: req.body.id_usuario,
        tipo_contenido: req.body.tipo_contenido,
        ref_contenido: req.body.ref_contenido,
        fecha: req.body.fecha
    })

    me_gusta.save(function (err, doc) {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(400).send(err)
        }        
    })
}

// hacer un get con el id de la publicacion/comentario para saber si un usuario ya dio me gusta
function getVerificarMeGusta(req, res) {

     Me_Gusta.find({ref_contenido:req.params.ref_contenido}, function(err, me_gusta) {
             if(!err) { 
               if(me_gusta) {
                   //Si hay alguna publicacion con ese id retornamos 1 para confirmar
                 return res.status(200).send(1)
              } else {
                  //si no hay datos con ese id retornamos 0 para descartar
                return res.status(200).send(0)
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}
function getMeGusta(req, res) {

    Me_Gusta.findById(req.params.id, function(err, me_gusta) {
        if(!err) {
            if(me_gusta) {
                return res.status(200).send(me_gusta)
            } else {
                return res.status(400).send({message: 'No tiene me gusta'})
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}
function getMeGustasContenido(req, res) {
    console.log(req.params.ref_contenido)
    console.log(req.params.tipo_contenido)
    const tc= req.params.tipo_contenido
    if((tc != 1) || (tc != 2) ) return res.status(400).send({message: 'El tipo de contenido no es valido'})

     Me_Gusta.find({ref_contenido:req.params.ref_contenido, tipo_contenido:req.params.tipo_contenido}, function(err, me_gusta) {
             if(!err) { 
               if(me_gusta) {
                 return res.status(200).send(me_gusta.lenght)
              } else {
                return res.status(200).send(0)
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

function eliminarMeGusta(req, res) {

    Categoria.findByIdAndDelete(req.params.id, function(err, doc) {

        if(!err) {
            return res.status(200).send({
                message: 'Like eliminado',
                LikeRemoved: doc
            })
        } else {
            return res.status(400).send({ message: err.message})
        }
    })

}



module.exports = {
    getVerificarMeGusta,
    agregarMeGusta,
    eliminarMeGusta,
    getMeGustasContenido,
    getMeGusta
}