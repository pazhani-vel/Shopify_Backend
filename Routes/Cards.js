const express = require('express')
const router = express.Router()
const {GetAllCard,AddNewCard,UpdateCard,Deletecard,ClearCard} = require('../Controller/CardsController')
const {validatejwt} = require('../middleware/ValidateJWTwebToken')

router.get('/',validatejwt,GetAllCard)

router.post('/add',validatejwt,AddNewCard)

router.put('/update',validatejwt,UpdateCard)

router.delete('/remove/:productid',validatejwt,Deletecard)

router.delete('/clear',validatejwt,ClearCard)

module.exports = router