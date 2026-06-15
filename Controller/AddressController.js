const asyncHandler = require('express-async-handler')
const UserModel = require('../Model/UserModel')

// for getting the user address
// get method
// private route
const GetUserAddress = asyncHandler(async(req,res)=>{
    const user = await UserModel.findById(req.user.id);

if(!user)
{
    res.status(404);
    throw new Error("User not found");
}

res.status(200).json(user.addresses);
})

// for posting the new address
// post method
// private route
const PostUserAddress = asyncHandler(async(req,res)=>{
    const {
    fullName,
    phone,
    street,
    city,
    state,
    pincode,
    country,
    isDefault
} = req.body;

if(
    !fullName ||
    !phone ||
    !street ||
    !city ||
    !state ||
    !pincode ||
    !country
)
{
    res.status(400);
    throw new Error("All address fields are required");
}

const user = await UserModel.findById(req.user.id);

if(!user)
{
    res.status(404);
    throw new Error("User not found");
}

if(isDefault)
{
    user.addresses.forEach(address=>{
        address.isDefault = false;
    });
}

user.addresses.push({
    fullName,
    phone,
    street,
    city,
    state,
    pincode,
    country,
    isDefault:isDefault || false
});

await user.save();

res.status(201).json({
    message:"Address added successfully",
    addresses:user.addresses
});

})

// for updateing the address
// put method
// private route
const UpdateUserAddress = asyncHandler(async(req,res)=>{
   const { addressid } = req.params;

const user = await UserModel.findById(req.user.id);

if(!user)
{
    res.status(404);
    throw new Error("User not found");
}

const address = user.addresses.id(addressid);

if(!address)
{
    res.status(404);
    throw new Error("Address not found");
}

const {
    fullName,
    phone,
    street,
    city,
    state,
    pincode,
    country,
    isDefault
} = req.body;

if(fullName) address.fullName = fullName;
if(phone) address.phone = phone;
if(street) address.street = street;
if(city) address.city = city;
if(state) address.state = state;
if(pincode) address.pincode = pincode;
if(country) address.country = country;

if(isDefault)
{
    user.addresses.forEach(addr=>{
        addr.isDefault = false;
    });

    address.isDefault = true;
}

await user.save();

res.status(200).json({
    message:"Address updated successfully",
    address
});

})

// for deleteing the address
// delete method
// private route
const DeleteUserAddress = asyncHandler(async(req,res)=>{
    const { addressid } = req.params;

const user = await UserModel.findById(req.user.id);

if(!user)
{
    res.status(404);
    throw new Error("User not found");
}

const address = user.addresses.id(addressid);

if(!address)
{
    res.status(404);
    throw new Error("Address not found");
}

address.deleteOne();

await user.save();

res.status(200).json({
    message:"Address deleted successfully"
});

})

module.exports = {GetUserAddress,PostUserAddress,UpdateUserAddress,DeleteUserAddress}