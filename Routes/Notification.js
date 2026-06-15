const express = require('express')
const router = express.Router()
const {GetAllNotification,ReadNotification,ReadAllNotification,DeleteNotification} = require('../Controller/NotificationController')

router.get('/',GetAllNotification)


router.put('/:id/read',ReadNotification)

router.put('/',ReadAllNotification)

router.delete('/:id',DeleteNotification)

module.exports = router;