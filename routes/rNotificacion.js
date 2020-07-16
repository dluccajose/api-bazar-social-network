const Express = require('express')
const cNotificacion = require('../controllers/cNotificacion')

var router = Express.Router()

router.post("/notificacion", cNotificacion.nuevaNotificacion)
router.put("/notificacion/readed/:id", cNotificacion.setAsReaded)

module.exports = router