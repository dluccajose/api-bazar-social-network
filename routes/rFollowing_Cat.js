const Express = require('express')
const cFollowing_Cat = require('../controllers/cFollowing_Cat')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

var router = Express.Router()

router.post("/following_cat", isAuth, cFollowing_Cat.agregarFollowing)
router.delete("/following_cat/:id", isAuth, cFollowing_Cat.eliminarFollowing)
router.get("/following_cat/:id", isAuth, cFollowing_Cat.getFollowing)
router.get("/following_cat_user/:id_user", isAuth, cFollowing_Cat.getCategoriasSiguiendo)

module.exports = router