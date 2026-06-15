const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const {DBConnect} = require('./Config/DBconnect')

app.use(cors())     // for connecting the frontend and backend

app.use(express.json())     // for sending the json

DBConnect()

app.use('/api/auth',require('./Routes/Authentication'))

app.use('/api/users',require('./Routes/User'))

app.use('/api/categories',require('./Routes/Category'))

app.use('/api/products',require('./Routes/Product'))

app.use('/api/cart',require('./Routes/Cards'))

app.use('/api/user/wishlist',require('./Routes/Wishlist'))

app.use('/api/user/address',require('./Routes/Address'))

app.use('/api/orders',require('./Routes/Order'))

app.use('/api/admin',require('./Routes/Admin'))

app.use('/api/reviews',require('./Routes/Review'))

app.use('/api/notifications',require('./Routes/Notification'))

app.use('/api/upload',require('./Routes/Upload'))

app.use('/api/search',require('./Routes/Product_Search_Filter'))

app.listen(process.env.PORT,()=>{
    console.log(`The server is running on port ${process.env.PORT}`)
})