const express = require('express')
const router = express.Router()
const {GetAllOrder,UpdateOrder} = require('../Controller/AdminContoller')

router.get('/',GetAllOrder)

router.put('/:id/status',UpdateOrder)

module.exports = router;