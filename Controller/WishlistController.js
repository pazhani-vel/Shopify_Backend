const asyncHandler = require('express-async-handler')
const UserModel = require('../Model/UserModel')
const ProductModel = require('../Model/ProductModel')

// used for getting the wishlist
// get method
// private
const GetWish = asyncHandler(async(req,res)=>{
    const user = await UserModel.findById(req.user.id)
    .populate("wishlist");

if(!user)
{
    res.status(404);
    throw new Error("User not found");
}

res.status(200).json(user.wishlist);
})

// used for add the wishlist
// post method
// private
const AddWish = asyncHandler(async(req,res)=>{
    const { productid } = req.body;

if(!productid)
{
    res.status(400);
    throw new Error("Product Id is required");
}

const product = await ProductModel.findById(productid);

if(!product)
{
    res.status(404);
    throw new Error("Product not found");
}

const user = await UserModel.findById(req.user.id);

if(!user)
{
    res.status(404);
    throw new Error("User not found");
}

const alreadyExists = user.wishlist.some(
    item => item.toString() === productid
);

if(alreadyExists)
{
    res.status(400);
    throw new Error("Product already exists in wishlist");
}

user.wishlist.push(productid);

await user.save();

res.status(200).json({
    message: "Product added to wishlist",
    wishlist: user.wishlist
});

})

// used for delete the wishlist
// delete method
// private
const DeleteWish = asyncHandler(async(req,res)=>{
   const { productid } = req.params;

const user = await UserModel.findById(req.user.id);

if(!user)
{
    res.status(404);
    throw new Error("User not found");
}

user.wishlist = user.wishlist.filter(
    item => item.toString() !== productid
);

await user.save();

res.status(200).json({
    message: "Product removed from wishlist",
    wishlist: user.wishlist
});

})

module.exports = {GetWish,AddWish,DeleteWish}