const Publicacion = require('../models/publicacion').Publicacion
const Categoria = require('../models/categoria').Categoria
const Usuario = require('../models/usuario').Usuario
const Amigo = require('../models/amigo').Amigo
const FollowingCat = require('../models/following_cat').followingCat

async function nuevaPublicacion(req, res) {

    var categoria
    var publicacion

    try {
        categoria  = await Categoria.findById(req.body.idCategoria)
    } catch(e) {
        return res.status(400).send({message: e.message})
    }

    if(!categoria) {
        return res.status(400).send({message: 'El ID de la categoria no existe en la base de datos'})
    }


    publicacion = new Publicacion({
        id_usuario: req.userId,
        id_categoria: req.body.idCategoria,
        tipo: req.body.tipo,
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        precio: req.body.precio,
        fecha_creacion: Date.now(),
        fecha_modificacion: Date.now(),
        is_active: 1
    })

    publicacion.save(function(err, doc) {
        
        if(err) {
            return res.status(400).send({message: err.message})
        }

        return res.status(200).send({message: "Publicacion creada exitosamente", pub: doc})
    })
}

function getPublicacion(req, res) {

    Publicacion.findById(req.params.id, function(err, pub) {

        if(err) {
            return res.status(400).send({message: err.message})
        }

        if(!pub) {
            return res.status(404).send({message: 'Publicacion no encontrada'})
        }

        return res.status(200).send(pub)

    }).populate('id_usuario id_categoria')
}


function desactivarPublicacion(req, res) {

    Publicacion.findById(req.params.id, function(err, pub) {

        if(err) {
            return res.status(400).send({message: err.message})
        }

        if(!pub) {
            return res.status(404).send({message: 'La publicacion no existe'})
        }

        if(pub.id_usuario != req.userId) {
            return res.status(404).send({message: 'No tienes permisos para realizar esta accion'})
        }

        pub.is_active = 0

        pub.save(function(err) {
            if(err) {
                return res.status(400).send({message: err.message})
            } else {
                return res.status(200).send({message: 'Publicacion desactivada con exito'})
            }
        })
    })
}

function activarPublicacion(req, res) {

    Publicacion.findById(req.params.id, function(err, pub) {

        if(err) {
            return res.status(400).send({message: err.message})
        }

        if(!pub) {
            return res.status(404).send({message: 'La publicacion no existe'})
        }

        if(pub.id_usuario != req.userId) {
            return res.status(404).send({message: 'No tienes permisos para realizar esta accion'})
        }

        pub.is_active = 1

        pub.save(function(err) {
            if(err) {
                return res.status(400).send({message: err.message})
            } else {
                return res.status(200).send({message: 'Publicacion activada con exito'})
            }
        })
    })
}

function eliminarPublicacion(req, res) {

    Publicacion.findById(req.params.id, function(err, pub) {

        if(err) {
            return res.status(400).send({message: err.message})
        }

        if(!pub) {
            return res.status(404).send({message: 'La publicacion no existe'})
        }

        if(pub.id_usuario != req.userId) {
            return res.status(400).send({message: 'No tienes permisos para eliminar esta publicacion'})
        }

        pub.remove(function(err) {
            if(err) {
                return res.status(400).send({message: err.message})
            }

            return res.status(200).send({ message: 'Publicacion eliminada con exito'})

        })
        
    })
}

async function modificarPublicacion(req, res) {

    var categoria
    var publicacion

    try {
        categoria = await Categoria.findById(req.body.idCategoria)
        publicacion = await Publicacion.findById(req.params.id)
    } catch(e){
        return res.status(400).send({message: e.message})
    }

    if(!categoria) {
        return res.status(400).send({message: 'El ID de la categoria no existe en la base de datos'})
    }

    if(!publicacion) {
        return res.status(400).send({message: 'La publicacion que estas intentado modificar no existe'})
    }

    if (publicacion.id_usuario != req.userId) {
        return res.status(400).send({message: 'No tienes permisos para modificar esta publicacion'})
    }

    publicacion.titulo = req.body.titulo
    publicacion.id_categoria = req.body.idCategoria
    publicacion.contenido = req.body.contenido
    publicacion.precio = req.body.precio
    publicacion.tipo = req.body.tipo
    publicacion.fecha_modificacion = Date.now()

    publicacion.save(function(err) {

        if(err) {
            return res.status(400).send({message: err.message})
        }

        return res.status(200).send({ message: 'Publicacion modificad con exito'})
    })
    

}

/* Muestra todas las publicaciones realizadas, en un rango desde 
   el parametro "from" hasta el parametro "last" ordenadas cronologicamente
 */

function ultimasPublicacionesHome(req, res) {

    var inicio = parseInt(req.params.from)
    var final = parseInt(req.params.to)

    if(inicio >= final) {
        return res.status(400).send({message: 'El parametro "from" no puede ser mayor que el parametro "to" '})
    }


    
    Publicacion.find({is_active: 1}).populate('id_usuario id_categoria').sort('-fecha_creacion').skip(inicio).limit(final-inicio)
                .exec(function(err, pubs) {

                    if(err) {
                        return res.status(400).send({message: err.message})
                    }
                    
                    return res.status(200).send(pubs)
                })

}


/* Muestra todas las publicaciones realizadas de un usuarios, en un rango desde 
   el parametro "from" hasta el parametro "last" ordenadas cronologicamente
 */

async function ultimasPublicacionesUser(req, res) {

    var inicio = parseInt(req.params.from)
    var final = parseInt(req.params.to)
    var userId = req.params.id

    try {
        // Verificamos que el usuario exista
         usuario = await Usuario.findById(userId)
    } catch(err) {
        return res.status(400).send({message: err.message})
    }

    if(!usuario) {
        return res.status(404).send({message: 'El usuario no existe'})
    }

    if(inicio >= final) {
        return res.status(400).send({message: 'El parametro "from" no puede ser mayor que el parametro "to" '})
    }

    var query = {id_usuario: userId, is_active: 1}

    if(req.params.show === 'all') {
        var query = {id_usuario: userId}
    }

    Publicacion.find(query).sort('-fecha_creacion').populate('id_usuario').skip(inicio).limit(final-inicio)
                .exec(function(err, pubs) {

                    if(err) {
                        return res.status(400).send({message: err.message})
                    }

                    return res.status(200).send(pubs)
                })

}

/* Muestras las ultimas publicaciones de las categorias que sigue un usuario, asi como tambien las 
   publicaciones de los amigos 
*/
async function timelineHome(req, res) {

    let inicio = parseInt(req.params.from)
    let final = parseInt(req.params.to)

    let categorias
    let categoriasFiltrado = []
    let amigos
    let amigosFiltrado = []
    let pubCategorias
    let pubAmigos
    let publicaciones
    let publicacionesFiltradas
    let pubTodas

    // Datos de prueba

    let mock_categorias = ['5d7aee85a0fdf416f0426b17', '5d7aeeb6cfd87428d826426e' ]
    let mock_amigos = [ {
        id_sender: '5d7aee85a0fdf416f0426b17',
        id_receiver: '5d8a88feafbdf816789675d2'
    },
    {
        id_sender: '5d8a88feafbdf816789675d2',
        id_receiver: '5d7aee85a0fdf416f0426b17'
    }]


    try {

        // ID de los usuarios que son amigos
        amigos = await Amigo.find({ $or: [ { id_sender: req.userId}, { id_receiver: req.userId} ]}, 'id_sender id_receiver')
        // ID de las categorias que sigue el usuario
        categorias = await FollowingCat.find({ id_user: req.userId}).select('id_categoria -_id')

        // Filtramos el arreglo para guardar solo los IDs de usuarios que no son iguales al usuario actual
        amigos.forEach( arr => {
            if( arr.id_sender == req.userId) {
                amigosFiltrado.push(arr.id_receiver)
            } else {
                amigosFiltrado.push(arr.id_sender)
            }
        })

        // Filtramos el arreglo de categorias para dejar solo el ID
        categorias.forEach( cat => {
            categoriasFiltrado.push(cat.id_categoria)
        })
        /* YA NO ES NECESARIO
        // Publicaciones de las categorias que sigue el usuario
        pubCategorias = await Publicacion.find({ id_categoria: { $in: categoriasFiltrado}}).skip(inicio).limit(final-inicio).populate(' id_usuario id_categoria')
        // Publicaciones de los amigos del usuario
        pubAmigos = await Publicacion.find({ id_usuario: { $in: amigosFiltrado}}).skip(inicio).limit(final-inicio).populate(' id_usuario id_categoria')
        */

        // Buscamos las publicaciones que que sean de las categorias seleccionadas o de los amigos
        pubTodas = await Publicacion.find({ $or: [ {id_usuario: { $in: amigosFiltrado}}, {id_categoria: { $in: categoriasFiltrado}}], is_active: 1}).sort('-fecha_creacion').skip(inicio).limit(final-inicio).populate(' id_usuario id_categoria')
    } catch (err) {
        return res.status(400).send({ message: err.message})
    }

    // Unimos los arreglos de ambas publicaciones
    //publicaciones = pubAmigos.concat(pubCategorias)

    // Ordenamos las publicaciones en orden cronologico
   /* pubTodas.sort(function(a,b) {
        var a = new Date(a.fecha_creacion)
        var b = new Date(b.fecha_creacion)
        return b-a
    })*/

    // Eliminamos las publicaciones duplicadas
    /*publicacionesFiltradas = publicaciones.filter( (valorActual, indiceActual, pub) => {
        return pub.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
    })*/
/*
    console.log('PUBLICACIONES UNIDAS')
    console.log(publicacionesFiltradas)
    console.log('PUBLICACIONES AMIGOS')
    console.log(pubAmigos)
    console.log('PUBLICACIONES CATEGORIAS')
    console.log(pubCategorias)*/

    res.status(200).send(pubTodas)

}

function publicacionesPorCategoria(req, res) {

    var inicio = parseInt(req.params.from)
    var final = parseInt(req.params.to)

    if(inicio >= final) {
        return res.status(400).send({message: 'El parametro "from" no puede ser mayor que el parametro "to" '})
    }


    
    Publicacion.find({ id_categoria: req.params.idCategoria, is_active: 1}).populate('id_usuario id_categoria').sort('-fecha_creacion').skip(inicio).limit(final-inicio)
                .exec(function(err, pubs) {

                    if(err) {
                        return res.status(400).send({message: err.message})
                    }
                    
                    return res.status(200).send(pubs)
                })
}

async function buscarPublicacion(req, res) {

    var query = req.params.query
    var resultados = []
    var inicio = parseInt(req.params.inicio)
    var final = parseInt(req.params.final)

    if(inicio > final) {
        return res.status(400).send({ message: 'El parametro Inicio no puede ser mayor que el parametro Final'})
    }

    try{

        // Buscamos publicaciones que contentan la variable query en el titulo o descripcion de la publicacion
        resultados = await Publicacion.find({$or: [ {titulo: { $regex: '.*' + query + '.*', $options:'i' } }, { descripcion: { $regex: '.*' + query + '.*', $options:'i' } } ], is_active: 1 })
                                        .populate('id_usuario id_categoria').sort('-fecha_creacion').skip(inicio).limit(final-inicio)

    } catch(error) {
        return res.status(400).send({ message: error.message})
    }

    return res.status(200).send(resultados)
}


module.exports = {
    nuevaPublicacion,
    getPublicacion,
    desactivarPublicacion,
    eliminarPublicacion,
    modificarPublicacion,
    ultimasPublicacionesHome,
    ultimasPublicacionesUser,
    timelineHome,
    publicacionesPorCategoria,
    buscarPublicacion,
    activarPublicacion
}