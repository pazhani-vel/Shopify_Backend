const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    name:{
        type:String,
        required:[true,"The name field is required"]
    },

    email:{
        type:String,
        required:[true,"The email field is required"],
        unique:true
    },

    password:{
        type:String,
        required:[true,"The password field is required"]
    },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },

    phone:{
        type:String
    },

    isBlocked:{
        type:Boolean,
        default:false
    },

    addresses:[
        {
            fullName:String,
            phone:String,
            street:String,
            city:String,
            state:String,
            pincode:String,
            country:String,
            isDefault:{
                type:Boolean,
                default:false
            }
        }
    ],

    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
},
{
    timestamps:true
})

module.exports = mongoose.model("User",UserModel)