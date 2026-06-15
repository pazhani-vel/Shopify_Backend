const express = require('express')
const router = express.Router()
const {CreateCategory,GetAllCategory,GetCatrogyById,UpdateCategory,DeleteCategory} = require('../Controller/CategoryController')

router.post('/',CreateCategory)

router.get('/',GetAllCategory)

router.get('/:id',GetCatrogyById)

router.put('/:id',UpdateCategory)

router.delete('/:id',DeleteCategory)

module.exports = router;