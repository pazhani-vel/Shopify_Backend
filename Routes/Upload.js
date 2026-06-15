const express = require('express')
const router = express.Router()
const {UploadImage,UploadMultipleImage} = require('../Controller/UploadController')

router.post('/single',UploadImage)

router.post('/multiple',UploadMultipleImage)

module.exports = router;