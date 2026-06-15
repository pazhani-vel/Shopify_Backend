const mongoose = require('mongoose')

const NotificationModel = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"The user field is required"]
    },

    title:{
        type:String,
        required:[true,"The title field is required"]
    },

    message:{
        type:String,
        required:[true,"The message field is required"]
    },

    type:{
        type:String,
        enum:[
            "ORDER_CREATED",
            "ORDER_CONFIRMED",
            "ORDER_SHIPPED",
            "ORDER_DELIVERED",
            "ORDER_CANCELLED"
        ]
    },

    isRead:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Notification",NotificationModel)