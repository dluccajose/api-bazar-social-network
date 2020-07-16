const Categoria = require('../models/categoria').Categoria
const Following_Cat = require('../models/following_cat').followingCat
const Usuario = require('../models/usuario').Usuario
const sToken = require('../services/sTokens')
const Publicacion = require('../models/publicacion').Publicacion

function agregarCategoria(req, res) {

    var categoria = new Categoria({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        file_path: req.body.file_path
    })

    categoria.save(function (err, doc) {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(400).send(err.message)
        }
    })
}

function getAllCategorias(req, res) {

    Categoria.find({}).lean().exec(function (err, categorias) {
        if (!err) {
            Following_Cat.find({}, function (err2, seguidas) {
                var id_seguidas = seguidas.map(function (seguida) {
                    return seguida.id_categoria.toString();
                }); 
                if (!err2) {
                    var respuesta = categorias.map(function (categoria) {
                        categoria.seguida = id_seguidas.indexOf(categoria._id.toString()) !== -1;
                       
                        return categoria;
                    });

                    return res.status(200).send(respuesta);
                } else {
                    return res.status(400).send({message: err2.message})
                }
            });

        } else {
            return res.status(400).send({message: err.message})
        }
    });
}

function getAllCategoriasLogin(req, res) {
    Categoria.find({}).lean().exec(function (err, categorias) {
        if (!err) {
            Following_Cat.find({ id_user: req.params.idUsuario}, function (err2, seguidas) {
                var id_seguidas = seguidas.map(function (seguida) {
                    return seguida.id_categoria.toString();
                });
                
                
                if (!err2) {
                    var respuesta = categorias.map(function (categoria) {
                        categoria.seguida = id_seguidas.indexOf(categoria._id.toString()) !== -1;
                       
                        return categoria;
                    });

                    return res.status(200).send(respuesta);
                } else {
                    return res.status(400).send({message: err2.message})
                }
            });

        } else {
            return res.status(400).send({message: err.message})
        }
    });
}

function getCategoria(req, res) {

    Categoria.findById(req.params.id, function (err, categoria) {
        if (!err) {
            if (categoria) {
                return res.status(200).send(categoria)
            } else {
                return res.status(400).send({message: 'Categoria no encontrada'})
            }

        } else {
            return res.status(400).send({message: err.message})
        }
    })
}


// verificar que no haya publicaciones con la categoria a eliminar
function eliminarCategoria(req, res) {
    Publicacion.find({id_categoria: req.params.id}, function (err2, publicaciones) {
        if (!err2) {
            if (publicaciones.length !== 0) {
                return res.status(400).send({message: 'No se pueden eliminar categorias que ya han sido colocadas en publicaciones'})
            } else {

                Categoria.findByIdAndDelete(req.params.id, function (err, doc) {

                    if (!err) {
                        return res.status(200).send({
                            message: 'Categoria eliminada',
                            categoriaRemoved: doc
                        })
                    } else {
                        return res.status(400).send({message: err.message})
                    }
                })
            }

        } else {
            return res.status(400).send({message: err2.message})
        }
    })


}


function modificarCategoria(req, res) {
    let categoriaId = req.params.id
    let update = req.body
    Categoria.findByIdAndUpdate(categoriaId, update, (err, categoriaUpdated) => {
        if (err) return res.status(500).send({message: ` Error al actualizar la categoria: ${err} `})
        return res.status(200).send({categoria: categoriaUpdated})
    })
}

function getCategoriasSeguidas(req, res) {
    console.log(req.userId)
    Categoria.find({}).lean().exec(function (err, categorias) {
        if (!err) {
            Following_Cat.find({ id_user: req.userId }, function (err2, seguidas) {

                var id_seguidas = seguidas.map(function (seguida) {
                    return seguida.id_categoria.toString();
                });
                if (!err2) {
                    var respuesta = categorias.map(function (categoria) {
                        categoria.seguida = id_seguidas.indexOf(categoria._id.toString()) !== -1;
                       
                        return categoria;
                    }).filter((categoria) => categoria.seguida);
                    console.log(respuesta)
                    return res.status(200).send(respuesta);
                } else {
                    return res.status(400).send({message: err2.message})
                }
            });

        } else {
            return res.status(400).send({message: err.message})
        }
    });
}

module.exports = {
    agregarCategoria,
    modificarCategoria,
    eliminarCategoria,
    getCategoria,
    getAllCategorias,
    getCategoriasSeguidas,
    getAllCategoriasLogin
}
