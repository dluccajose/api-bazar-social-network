const MediaPost = require('../models/media_post').MediaPost


function agregarMediaPost(req, res) {

    var mediaPost = new MediaPost({
        id_media: req.body.idMedia,
        id_publicacion: req.body.idPublicacion
    })

    mediaPost.save(function(err) {

        if(err) {
            return res.status(400).send({message: err.message})
        }

        return res.status(200).send({ message: 'MediaPost agregado con exito'})
    })

}

function eliminarMediaPost(req, res) {

    MediaPost.findById(req.params.id, function(err, mediaPost) {
        
        if(err) {
            return res.status(400).send({message: err.message}) 
        }

        if(!mediaPost) {
            return res.status(400).send({message: 'El ID del mediaPost no es valido'}) 
        }

        mediaPost.remove(function(err) {
            
            if(err) {
                return res.status(400).send({message: err.message}) 
            }

            return res.status(200).send({ message: 'MediaPost eliminado con exito'})
        })

        
    })
}

module.exports = {
    agregarMediaPost,
    eliminarMediaPost
}