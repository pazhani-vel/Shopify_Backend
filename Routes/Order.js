const express = require('express')
const router = express.Router()
const {PlaceOrder,UserOrder,OrderById,CancelOrder} = require('../Controller/OrderController')

router.post('/',PlaceOrder)

router.get('/myorder',UserOrder)

router.get('/:id',OrderById)

router.put('/:id/cancel',CancelOrder)

module.exports = router;