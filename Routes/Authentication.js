const express = require('express')
const router = express.Router()
const {validatejwt} = require('../middleware/ValidateJWTwebToken')
const {UserLogin,AdminLogin,AdminRegister,UserRegister,GetCurrentUser,UpdateProfile,UpadatePassword} = require('../Controller/AuthenticationController')

router.post('/userlogin',UserLogin)

router.post('/adminlogin',AdminLogin)

router.post('/adminregister',AdminRegister)

router.post('/userregister',UserRegister)

router.get('/me',validatejwt,GetCurrentUser)

router.put('/update-profile',validatejwt,UpdateProfile)

router.put('/change-password',validatejwt,UpadatePassword)

module.exports = router;