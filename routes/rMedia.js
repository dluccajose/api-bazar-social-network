const Express = require('express')
const cMedia = require('../controllers/cMedia')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
var multer = require('multer')({dest: 'public/uploads'})
var fs = require('fs')

var router = Express.Router()

router.post("/media", isAuth,[multer.single('file_path')], cMedia.agregarMedia),
router.get("/media/:id", isAuth, cMedia.verMedia),
router.get("/medias", isAuth, cMedia.consutarMedia)
router.post('/media/multi', isAuth, [multer.array('imagenes')], cMedia.agregarMediaMultiplePost)
router.get('/media/post/:id', cMedia.getAllMediaPost)
module.exports = router