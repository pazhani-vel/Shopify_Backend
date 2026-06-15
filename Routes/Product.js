const express = require('express')
const router = express.Router()
const {CreateProduct,AllProduct,ProductById,UpdateProduct,DeleteProduct} = require('../Controller/ProductController')

router.post('/',CreateProduct)

router.get('/',AllProduct)

router.get('/:id',ProductById)

router.put('/:id',UpdateProduct)

router.delete('/:id',DeleteProduct)

module.exports = router;