const Express = require('express')
const cMediaPost = require('../controllers/cMediaPost')

var router = Express.Router()

router.post("/mediaPost", cMediaPost.agregarMediaPost)
router.delete("/mediaPost/:id", cMediaPost.eliminarMediaPost)

module.exports = router


