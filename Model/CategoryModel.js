const mongoose = require('mongoose')

const CategoryModel = mongoose.Schema({
    name:{
        type:String,
        required:[true,"The category name is required"],
        unique:true
    },

    description:{
        type:String
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Category",CategoryModel)