const asyncHandler = require('express-async-handler')
const CartModel = require('../Model/CartModel')
const OrderModel = require('../Model/OrderModel')

// used for place the order
// post method
// private 
const PlaceOrder = asyncHandler(async(req,res)=>{
    const userid = req.user.id;

const { shippingAddress } = req.body;

const cart = await CartModel.findOne({
    user:userid
});

if(!cart || cart.items.length === 0)
{
    res.status(400);
    throw new Error("Cart is empty");
}

const order = await OrderModel.create({
    user:userid,

    products: cart.items.map(item => ({
        product:item.product,
        quantity:item.quantity,
        price:item.price
    })),

    shippingAddress,

    totalAmount:cart.totalAmount
});

// Clear cart after placing order
cart.items = [];
cart.totalAmount = 0;

await cart.save();

res.status(201).json(order);

})

// used for getting the user order
// get method
// private
const UserOrder = asyncHandler(async(req,res)=>{
   const orders = await OrderModel.find({
    user:req.user.id
})
.populate("products.product")
.sort({createdAt:-1});

res.status(200).json(orders);

})


// used for getting the single order by id
// get method
// private
const OrderById = asyncHandler(async(req,res)=>{
    const order = await OrderModel.findById(
    req.params.id
)
.populate("products.product")
.populate("user","name email");

if(!order)
{
    res.status(404);
    throw new Error("Order not found");
}

if(order.user._id.toString() !== req.user.id)
{
    res.status(403);
    throw new Error("Unauthorized");
}

res.status(200).json(order);

})

// used for cancel the order
// put method
// private
const CancelOrder = asyncHandler(async(req,res)=>{
    const order = await OrderModel.findById(
    req.params.id
);

if(!order)
{
    res.status(404);
    throw new Error("Order not found");
}

if(order.user.toString() !== req.user.id)
{
    res.status(403);
    throw new Error("Unauthorized");
}

if(
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled"
)
{
    res.status(400);
    throw new Error(
        "Order cannot be cancelled"
    );
}

order.orderStatus = "Cancelled";

await order.save();

res.status(200).json({
    message:"Order cancelled successfully",
    order
});

})

module.exports = {PlaceOrder,UserOrder,OrderById,CancelOrder};