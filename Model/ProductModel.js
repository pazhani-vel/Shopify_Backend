const mongoose = require('mongoose')

const ProductModel = mongoose.Schema({
    title:{
        type:String,
        required:[true,"The title field is required"]
    },

    price:{
        type:Number,
        required:[true,"The price field is required"]
    },
    
    description:{
        type:String,
        required:[true,"The description field is required"]
    },

    stock:{
        type:Number,
        required:[true,"The stock field is required"]
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",     // used to easily connect with other collection
        required:true
    },

    images:[
        {
            public_id:String,
            url:String
        }
    ],

    averageRating:{
        type:Number,
        default:0
    },

    totalReviews:{
        type:Number,
        default:0
    },

    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Product",ProductModel)