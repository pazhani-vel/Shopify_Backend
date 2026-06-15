const asyncHandler = require('express-async-handler')

// for getting all the order of user
// get method
// private routing
const GetAllOrder = asyncHandler(async(req,res)=>{
    console.log("This is the route for all the order")
})

// for updating the order status
// put method
// private route
const UpdateOrder = asyncHandler(async(req,res)=>{
    console.log("This is the route for update status order")
})

module.exports = {GetAllOrder,UpdateOrder}