const asyncHandler = require('express-async-handler')
const ProductModel = require('../Model/ProductModel')

// used for searching the product
// get method
// private routing
const SearchProduct = asyncHandler(async(req,res)=>{

    const keyword = req.query.keyword || "";

    const products = await ProductModel.find({
        $or:[
            {
                title:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                description:{
                    $regex:keyword,
                    $options:"i"
                }
            }
        ]
    }).populate("category");

    res.status(200).json(products);
});


module.exports = {SearchProduct}