// Importamos los modelos necesarios
const Media = require('../models/media').Media
const sToken = require('../services/sTokens')
const MediaPost = require('../models/media_post').MediaPost

var multer = require('multer')({ dest: 'public/uploads' })
var fs = require('fs')
var path = require('path')


// Subir multiples imagenes para un post
// Falta agregar manejo de errores
function agregarMediaMultiplePost(req, res) {
    var idPost = req.body.idPost
    req.files.forEach(img => {

        // Nombre del archivo
        var fileName = storeWithOriginalName(img)
        // Crear media
        var media = new Media({
            file_path: "/uploads/" + fileName,
            tipo: req.body.tipo
        })

        // Guardar registro de imagen en base de datos
        media.save(function (err, med) {

            if (err) {
                console.log(err.message)
            } else {

                // Relacionamos la imagen con el post
                var mediaPost = new MediaPost({
                    id_media: med._id,
                    id_publicacion: idPost
                })

                // Guardamos en la base de datos
                mediaPost.save(function (err, doc) {
                    if (err) {
                        console.log(err.message)
                    } else {
                        console.log("MediaPost guardado")
                    }
                })
            }
        })

    });

    return res.status(200).send({ message: 'Metodo ejecutado'})
}


// Agregar Media
function agregarMedia(req, res) {
    var  fileName  = storeWithOriginalName(req.file);
    var media = new Media({
        file_path: "/uploads/" + fileName,
        tipo: req.body.tipo
    })
    media.save(function (err, doc) {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(400).send(err)
        }
    })
}

function storeWithOriginalName(file) {
    var now = Date.now();
    var no = now + file.originalname;
    var fullNewPath = path.join(file.destination, no)
    fs.renameSync(file.path, fullNewPath)
    return no
}

function verMedia(req, res) {
    Media.findById(req.params.id, function (err, media) {
        if (!err) {
            if (media) {
                res.redirect(media.file_path);
            } else {
                return res.status(400).send({ mesage: "no hay" })
            }
        } else {
            return res.status(400).send({ message: err.message })
        }
    })
}
function consutarMedia(req, res) {
    Media.findById({}, function (err, medias) {
        if (!err) {
            if (medias) {
                res.redirect(medias);
            } else {
                return res.status(400).send({ mesage: "no hay" })
            }
        } else {
            return res.status(400).send({ message: err.message })
        }
    })
}

// Devuelve todas las imagenes pertenecientes a una publicacion
async function getAllMediaPost(req, res) {
    
    var idPub = req.params.id
    var mediaPost = []
    var imagenes = []
    var media

    // Buscamos las imagenes asociadas a una publicacion
    try {
        mediaPost = await MediaPost.find({ id_publicacion: idPub})
    } catch(err) {
        return res.status(400).send({ message: err.message})
    }

    for(var i=0; i<mediaPost.length; i++) {
        try {
            media = await Media.findById(mediaPost[i].id_media)
        } catch(err) {
            return res.status(400).send({ message: err.message})
        }
        imagenes.push(media)
    }
   /*   Funcion asincrona no funciona bien dentro de un forEach
   mediaPost.forEach( img => {
        try {
            media = await Media.findById(img.id_media)
        } catch(err) {
            return res.status(400).send({ message: err.message})
        }
        imagenes.push(media)
    })*/

    return res.status(200).send(imagenes)



}
module.exports = {
    agregarMedia,
    verMedia,
    consutarMedia,
    agregarMediaMultiplePost,
    getAllMediaPost
}