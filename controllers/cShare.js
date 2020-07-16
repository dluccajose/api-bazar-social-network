const Share = require('../models/share').Share
const sToken = require('../services/sTokens')

function agregarShare (req, res) {
    var share = new Share({
        id_publicacion: req.body.id_publicacion,
        id_usuario: req.body.id_usuario,
        fecha: req.body.fecha
    })

    share.save(function (err, doc) {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(400).send(err)
        }        
    })
}

function eliminarShare(req, res) {

    Share.findByIdAndDelete(req.params.id, function(err, doc) {

        if(!err) {
            return res.status(200).send({
                message: 'Share eliminado',
                ShareRemoved: doc
            })
        } else {
            return res.status(400).send({ message: err.message})
        }
    })

}


module.exports = {
    agregarShare,
    eliminarShare
}