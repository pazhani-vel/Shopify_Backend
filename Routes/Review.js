const express = require('express')
const router = express.Router()
const  {CreateReview,GetReview,UpdateReview,DeleteReview} = require('../Controller/ReviewController')

router.post('/',CreateReview)

router.get('/product/:productid',GetReview)

router.put('/:id',UpdateReview)

router.delete('/:id',DeleteReview)

module.exports = router;