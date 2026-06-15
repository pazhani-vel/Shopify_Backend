const asyncHandler = require('express-async-handler')

// used for uploading the one image
// post method
// private
const UploadImage = asyncHandler(async(req,res)=>{
    console.log("This is the route for upload single image")
})

// used for uploading the multiple image
// post method
// private
const UploadMultipleImage = asyncHandler(async(req,res)=>{
    console.log("This is the route for upload multiple image")
})

module.exports = {UploadImage,UploadMultipleImage}