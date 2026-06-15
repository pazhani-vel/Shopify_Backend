const express = require('express')
const router = express.Router()
const {GetUserAddress,PostUserAddress,UpdateUserAddress,DeleteUserAddress} = require('../Controller/AddressController')
const {validatejwt} = require('../middleware/ValidateJWTwebToken')

router.get('/',validatejwt,GetUserAddress)

router.post('/',validatejwt,PostUserAddress)

router.put('/:addressid',validatejwt,UpdateUserAddress)

router.delete('/:addressid',validatejwt,DeleteUserAddress)

module.exports = router;