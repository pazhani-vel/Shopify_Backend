const asyncHandler = require('express-async-handler')
const UserModel = require('../Model/UserModel')

// for getting all the user
// get method
// private
const GetAllUser = asyncHandler(async(req,res)=>{
    const user = await UserModel.find().select("-password")

    res.status(200).json(user)
})

// for getting all the user by id
// get method
// private
const GetUserById = asyncHandler(async(req,res)=>{
    const userid = req.params.id;
    const user = await UserModel.findOne({_id:userid}).select("-password")

    if(!user)
    {
        res.status(400)
        throw new Error("There is no such a user")
    }
    res.status(200).json(user)
})

// for block the user
// put method
// private
const BlockUser = asyncHandler(async(req,res)=>{
    const userid = req.params.id;
    const BlockedUser = await UserModel.findByIdAndUpdate(
        userid
    ,{
        isBlocked:true
},
{
    new:true
})

    if(!BlockedUser)
    {
        res.status(400)
        throw new Error("There is no such a user")
    }

    res.status(200).send("The user is blocked")
})

// for unblock the user
// put method
// private
const UnblockUser = asyncHandler(async(req,res)=>{
    const userid = req.params.id;
    const UnBlockedUser = await UserModel.findByIdAndUpdate(
        userid
    ,{
        isBlocked:false
},
{
    new:true
})

    if(!UnBlockedUser)
    {
        res.status(400)
        throw new Error("There is no such a user")
    }

    res.status(200).send("The user is Unblocked")
})

// for delete the user
// delete method
// private
const DeleteUser = asyncHandler(async(req,res)=>{

    const userid = req.params.id;
    const DeletedUser = await UserModel.findByIdAndDelete(userid);

    if(!DeleteUser)
    {
        res.status(400)
        throw new Error("There is no such a user")
    }

    res.status(200).send("The user is deleted");
})

module.exports = {GetAllUser,GetUserById,BlockUser,UnblockUser,DeleteUser}