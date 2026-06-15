const express = require('express')
const router =express.Router()
const {SearchProduct} = require('../Controller/Product_Search_Filter_Controller')

router.get('/',SearchProduct)

module.exports = router;