const Following_Cat = require('../models/following_cat').followingCat
const sToken = require('../services/sTokens')

function agregarFollowing (req, res) {
    var following_cat = new Following_Cat({
        id_user: req.userId,
        id_categoria: req.body.id,
    })
    following_cat.save(function (err, doc) {
        if (!err) {
            return res.status(200).send({message: "sigo"})
        } else {
            return res.status(400).send(err)
        }        
    })
}
 // hacer un metodo donde con el id del usuario retornar todas las categorias que este sigue
 function getCategoriasSiguiendo(req, res) {
     //hacemos la bsuqueda de las categorias que sigue el usuario
     Following_Cat.find({id_user:req.params.id_user}, function(err, cats_siguiendo) {
             if(!err) { 
               if(cats_siguiendo) {
                    //Buscamos todas las categorias que sigue ese usuario
                     Categoria.populate(cats_siguiendo, {path: "id_categoria"},function(err, cats_siguiendo){
                         if(!err) return res.status(200).send(cats_siguiendo)
                         return res.status(400).send({message: err.message})
                        })
                        
              } else {
                return res.status(200).send(0)
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}
function eliminarFollowing(req, res) {
    Following_Cat.findOneAndDelete(
        { id_user: req.userId, $and: [ { id_categoria: req.params.id   } ] }, function(err, doc) {
        if(!err) {
            return res.status(200).send({
                message: 'Following de categoria eliminado',
                Following_cat_Removed: doc
            })
        } else {
            return res.status(400).send({ message: err.message})
        }
    })

}
function getFollowing(req, res) {

    Following_Cat.findById(req.params.id, function(err, following_cat) {
        if(!err) {
            if(following_cat) {
                return res.status(200).send(following_cat)
            } else {
                return res.status(400).send({message: 'Following de la categoria no encontrado'})
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}

module.exports = {
    agregarFollowing,
    eliminarFollowing,
    getFollowing,
    getCategoriasSiguiendo
}