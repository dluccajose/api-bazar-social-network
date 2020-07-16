/* Verifica si el usuario realizando la peticion tiene permisos de administrador

Si el usuario no tiene permisos de administrador, se devuelve un mensaje de error

Primero se debe haber ejecutado el middleware isAuth 

*/

function isAdmin(req, res, next) {
    // Verificamos el el usuario es de tipo administrador
    if(req.userTipo === 2) {
        // Continuamos con el siguiente middleware
        next()
    } else {
        return res.status(401).send({ message: 'Necesitas permisos de administrador para realizar esta accion'})
    }
}

module.exports = isAdmin