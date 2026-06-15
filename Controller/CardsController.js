const asyncHandler = require('express-async-handler')
const CartModel = require('../Model/CartModel')
const ProductModel = require('../Model/ProductModel')

// used for getting all the card
// get method
// private route
const GetAllCard = asyncHandler(async(req,res)=>{
    const AllCarts = await CartModel.find()

    if(AllCarts)
    {
        res.status(200).json(AllCarts);
    }
    else{
        res.status(400)
        throw new Error("Problem is getting all the carts");
    }
})

// used for  add the card
// post method
// private route
const AddNewCard = asyncHandler(async(req,res)=>{
    const productid = req.body.productid;
    const quantity = req.body.quantity;

    const userid = req.user.id;

    if(!productid)
    {
        res.status(400)
        throw new Error("productid is required");
    }

    const product = await ProductModel.findById(productid);

    if(!product)
    {
        res.status(404)
        throw new Error("Product not found");
    }

    let cart = await CartModel.findOne({
        user:userid
    })

    if(!cart)
    {
        cart = await CartModel.create(
            {
                user:userid,
                items:[],
                totalAmount:0
            }
        );
    }

    const AlreadyProductExist = cart.items.find(
        item => item.prioduct.toString()===productid
    );

    if(AlreadyProductExist)
    {
        AlreadyProductExist.quantity += quantity || 1;
    }
    else{
        cart.items.push(
            {
                product:product._id,
                quantity:quantity || 1,
                price:product.price
            }
        );
    }

    cart.totalAmount = cart.items.reduce(
        (total,item)=> total + (item.price * item.quantity),
        0
    );

    await cart.save()

    res.status(200).json(cart);
})

// used for update the card
// put method
// private route
const UpdateCard = asyncHandler(async(req,res)=>{
    const { productid, quantity } = req.body;
    const userId = req.user.id;

    if(!productid || !quantity)
    {
        res.status(400);
        throw new Error("Product Id and quantity are required");
    }

    const cart = await CartModel.findOne({
        user:userId
    });

    if(!cart)
    {
        res.status(404);
        throw new Error("Cart not found");
    }

    const item = cart.items.find(
        item => item.product.toString() === productid
    );

    if(!item)
    {
        res.status(404);
        throw new Error("Product not found in cart");
    }

    item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
        (total,item)=> total + (item.price * item.quantity),
        0
    );

    await cart.save();

    res.status(200).json(cart);
})

// used for delete the card
// delete method
// private route
const Deletecard = asyncHandler(async(req,res)=>{
    const productid = req.params.productid;
    const userId = req.user.id;

    const cart = await CartModel.findOne({
        user:userId
    });

    if(!cart)
    {
        res.status(404);
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productid
    );

    cart.totalAmount = cart.items.reduce(
        (total,item)=> total + (item.price * item.quantity),
        0
    );

    await cart.save();

    res.status(200).json({
        message:"Product removed from cart",
        cart
    });
})

// used for clear all card
// delete method
// private route
const ClearCard = asyncHandler(async(req,res)=>{
    const userid = req.user.id;

    const cart = await CartModel.findOne({
        user:userid
    })

    if(!cart)
    {
        res.status(404);
        throw new Error("cart not found");
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.status(200).json({
        message:"Cart cleared successfully"
    });
})

module.exports = {GetAllCard,AddNewCard,UpdateCard,Deletecard,ClearCard};