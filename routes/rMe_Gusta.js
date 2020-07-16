const Express = require('express')
const cMe_Gusta = require('../controllers/cMe_Gusta')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

var router = Express.Router()

router.post("/me_gusta", isAuth, cMe_Gusta.agregarMeGusta)
router.delete("/me_gusta/:id", isAuth,  cMe_Gusta.eliminarMeGusta)
router.get("/me_gusta/:id", isAuth, cMe_Gusta.getMeGusta)
router.get("/me_gustas_contenido/:ref_contenido/:tipo_contenido",isAuth, cMe_Gusta.getMeGustasContenido)
router.get("/me_gusta/:ref_contenido", isAuth, cMe_Gusta.getVerificarMeGusta)

module.exports = router