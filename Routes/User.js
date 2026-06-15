const express = require('express')
const router = express.Router()
const {GetAllUser,GetUserById,BlockUser,UnblockUser,DeleteUser} = require('../Controller/UserController')

router.get('/',GetAllUser)

router.get('/:id',GetUserById)

router.put('/:id/block',BlockUser)

router.put('/:id/unblock',UnblockUser)

router.delete('/:id',DeleteUser)

module.exports = router;