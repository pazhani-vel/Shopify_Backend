const mongoose = require('mongoose')

const OrderModel = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },

            quantity:Number,

            price:Number
        }
    ],

    shippingAddress:{
        fullName:String,
        phone:String,
        street:String,
        city:String,
        state:String,
        pincode:String,
        country:String
    },

    totalAmount:{
        type:Number,
        required:true
    },

    orderStatus:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default:"Pending"
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Order",OrderModel)