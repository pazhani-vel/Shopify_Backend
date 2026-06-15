const express = require('express')
const router = express.Router()
const {GetWish,AddWish,DeleteWish} = require('../Controller/WishlistController')
const {validatejwt} = require('../middleware/ValidateJWTwebToken')

router.get('/',validatejwt,GetWish)

router.post('/:productid',validatejwt,AddWish)

router.delete('/:productid',validatejwt,DeleteWish)

module.exports = router;
