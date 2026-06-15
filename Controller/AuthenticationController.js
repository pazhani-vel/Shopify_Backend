const asyncHandler = require('express-async-handler')
const UserModel = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


// used for user login
// post method
// public routing
const UserLogin = asyncHandler(async(req,res)=>{
   const email = req.body.email;
     const password = req.body.password;

     if(!email || !password)
     {
         res.status(400)
        throw new Error("All fields are required");
     }

     const User = await UserModel.findOne({email})

     console.log(User)
     
     if(User && (await bcrypt.compare(password,User.password)) && User.role === "admin")
     {
         res.status(403)
        throw new Error("You are admin, Go to admin login")
     }
     else if(User && (await bcrypt.compare(password,User.password)))
     {
        const accesstoken = await jwt.sign(
                    {
                        user:{
                        id:User._id,
                        name:User.name,
                        email:User.email
                    }},process.env.JWT_SECRET_KEY,
                    {expiresIn:"1h"}
                );
        
                res.status(200).json({accesstoken})
     }
     else{
        res.status(401)
        throw new Error("The User is not registered")
     }
})


// used for admin login
// post method
// public method
const AdminLogin = asyncHandler(async(req,res)=>{
    const email = req.body.email;
     const password = req.body.password;

     if(!email || !password)
     {
         res.status(400)
        throw new Error("All fields are required");
     }

     const Admin = await UserModel.findOne({email})

     console.log(Admin)
     
     if(Admin && (await bcrypt.compare(password,Admin.password)) && Admin.role === "user")
     {
         res.status(403)
        throw new Error("You are user, Go to user login")
     }
     else if(Admin && (await bcrypt.compare(password,Admin.password)))
     {
        const accesstoken = await jwt.sign(
                    {
                        user:{
                        id:Admin._id,
                        name:Admin.name,
                        email:Admin.email
                    }},process.env.JWT_SECRET_KEY,
                    {expiresIn:"1h"}
                );
        
                res.status(200).json({accesstoken})
     }
     else{
        res.status(401)
        throw new Error("The Admin is not registered")
     }
})


// used for admin register
// post method
// public route
const AdminRegister = asyncHandler(async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const addresses = req.body.addresses;
    const role = "admin";
    

    if(!name || !email || !password || !phone)
    {
        res.status(400)
        throw new Error("Name,email,password,phone number,address are mandatory");
    }

    const AlreadyExist = await UserModel.findOne({email:email})

    if(AlreadyExist)
    {
        res.status(400)
        throw new Error("User already exist");
    }

    const HashedPassword = await bcrypt.hash(password,10);
    console.log(HashedPassword)

    const Newadmin = await UserModel.create({
        name,
        email,
        password: HashedPassword,
        role,
        phone,
        addresses
})

    if(Newadmin)
    {
        console.log(name,email);

        res.status(201).json({
            message:"The user sucessfully registered",
            user:{
                id: Newadmin._id,
                name: Newadmin.name,
                email: Newadmin.email
            }
        });
    }
    else
    {
        res.status(400)
        throw new Error("The problem is admin registering process");
    }
})


// used for user register
// post method
// public routing
const UserRegister = asyncHandler(async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const addresses = req.body.addresses;
    

    if(!name || !email || !password || !phone)
    {
        res.status(400)
        throw new Error("Name,email,password,phone number,address are mandatory");
    }

    const AlreadyExist = await UserModel.findOne({email:email})

    if(AlreadyExist)
    {
        res.status(400)
        throw new Error("User already exist");
    }

    const HashedPassword = await bcrypt.hash(password,10);
    console.log(HashedPassword)

    const NewUser = await UserModel.create({
        name,
        email,
        password: HashedPassword,
        phone,
        addresses
})

    if(NewUser)
    {
        console.log(name,email);

        res.status(201).json({
            message:"The user sucessfully registered",
            user:{
                id: NewUser._id,
                name: NewUser.name,
                email: NewUser.email
            }
        });
    }
    else
    {
        res.status(400)
        throw new Error("The problem is user registering process");
    }
})


// used for get the current user
// get method
// private routing
const GetCurrentUser = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})


// used for update the user profile for name,phone
// put method
// private route
const UpdateProfile = asyncHandler(async(req,res)=>{
    const name = req.body.name;
    const phone = req.body.phone;
    const userid = req.user.id;

    if(!name && !phone)
    {
        res.status(400)
        throw new Error("Name or phone field are required")
    }

    if(!phone)
    {
        const UpdateName = await UserModel.findByIdAndUpdate(
            userid
        ,{
            name:name
        },{
            new:true
        })

        res.status(200).send("The is Profile name is updated");
    }
    else if(!name)
    {
        const UpdatePhone = await UserModel.findByIdAndUpdate(
            userid
        ,{
            phone:phone
        },{
            new:true
        })

        res.status(200).send("The is Profile phone number is updated");
    }
    else
    {
         const UpdateProfile = await UserModel.findByIdAndUpdate(
            userid
        ,{
            phone:phone,name:name
        },{
            new:true
        })

        res.status(200).send("The is Profile Name and phone number is updated");
    }
})



// used for change the password
// put method
// public routing
const UpadatePassword = asyncHandler(async(req,res)=>{

    const NewPassword = req.body.password;
    const userid = req.user.id;

    if(!NewPassword)
    {
        res.status(400)
        throw new Error("New Password is required")
    }

    const HashedPassword = await bcrypt.hash(NewPassword,10);

    const UpdatedProfile = await UserModel.findByIdAndUpdate(
        userid
    ,{
        password:HashedPassword
    },
    {
        new:true
    })

    console.log(UpdateProfile)
    res.status(200).send("The is Profile password is updated");
})

module.exports = {UserLogin,AdminLogin,AdminRegister,UserRegister,GetCurrentUser,UpdateProfile,UpadatePassword}