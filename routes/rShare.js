const Express = require('express')
const cShare = require('../controllers/cShare')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

var router = Express.Router()

router.post("/share", isAuth, cShare.agregarShare)
router.delete("/share/:id", isAuth, cShare.eliminarShare)

module.exports = router