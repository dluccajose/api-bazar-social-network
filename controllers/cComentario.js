
const Comentario = require('../models/comentario')

function getComentario (req, res)
{
    let comentarioId = req.params.comentarioId

    Comentario.findById(comentarioId, (err, comentario) => {
        if (err) return res.status(500).send({message: 'Error al realizar busqueda'})
        if (!comentario) return res.status(404).send({message: 'El comentario no existe'})

        res.status(200).send({comentario})
    })
}

function actualizarComentario (req, res)
{
    let comentarioId = req.params.comentarioId
    let update = req.body

    Comentario.findByIdAndUpdate(comentarioId, update, (err, comentarioUpdated) => {
        if(err) res.status(500).send({message: 'Error al modificar el Comentario'})
    
        res.status(200).send({ comentario: comentarioUpdated})
    })
}
function eliminarComentario(req, res)
{
    let comentarioId = req.params.comentarioId

    Comentario.findById(comentarioId, (err) => {
        if(err) res.status(500).send({message: 'Error al Borrar el Comentario'})
    
        comentario.remove(err => {
            if(err) res.status(500).send({message: 'Error al Borrar el Comentario'})
            res.status(200).send({message: 'El Comentario ha sido eliminado'})

        })
    })
}
async function guardarComentario (req, res)
{
    console.log('POST /comentario')
    console.log(req.body)
    var comentario

    comentario = new Comentario({
    id_comentario_respuesta : req.body.id_comentario_respuesta,
    id_publicacion : req.body.id_publicacion,
    id_usuario : req.body.id_usuario,
    comentario : req.body.comentario
    });

    comentario.save(function(err, doc) {
        
        if(err) {
            return res.status(400).send({message: err.message})
        }

        return res.status(200).send({message: "Comentario Guardado exitosamente"})

    })

}
module.exports = {
    getComentario,
    actualizarComentario,
    eliminarComentario,
    guardarComentario
}