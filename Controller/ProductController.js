const asyncHandler = require('express-async-handler')
const ProductModel = require('../Model/ProductModel')
const CategoryModel = require('../Model/CategoryModel')

// used for admin to create the product
// post method
// private route
const CreateProduct = asyncHandler(async(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const stock = req.body.stock;
    const category = req.body.category;

    if(!title || !description || !price || !stock || !category)
    {
        res.status(400)
        throw new Error("All field are required")
    }

    console.log(req.body)

    const NewProduct = await ProductModel.create({
        title:title,
        description:description,
        price:price,
        stock:stock,
        category:category
    })

    if(NewProduct)
    {
        res.status(200).send("The new Product is created")
    }
    else{
        res.status(400)
        throw new Error("Problem in product creation")
    }
    
})

// used for get all the product
// get method
// private
const AllProduct = asyncHandler(async(req,res)=>{
    const GetAllProduct = await ProductModel.find()

    if(GetAllProduct)
    {
        res.status(200).json(GetAllProduct)
    }
    else
    {
        res.status(400)
        throw new Error("There is a problem in getting all the product")
    }
})

// used for get single product
// get method
// private
const ProductById = asyncHandler(async(req,res)=>{
    const productid = req.params.id;
    const GetProduct = await ProductModel.findById(productid)

    if(GetProduct)
    {
        res.status(200).json(GetProduct)
    }
    else
    {
        res.status(400)
        throw new Error("There is a problem in getting the product")
    }
})

// used for update the product
// put method
// private
const UpdateProduct = asyncHandler(async(req,res)=>{
    // may be update the price or stock

    const productid = req.params.id;
    const price = req.body.price ?  req.body.price : 0;
    const stock = req.body.stock ? req.body.stock : 0;
    const product = await ProductModel.findById(productid)

    if(product)
    {
        if(price===0 && stock===0)
        {
            res.status(400)
        throw new Error("price or stock is required")
        }
        else if(price!==0 && stock!==0)
        {
            const updateproduct = await ProductModel.findByIdAndUpdate(productid,{
                price:price,stock:stock
            },{new:true})
            res.status(200).send("The price and stock is updated");
        }
        else if(price!==0)
        {
            const updateproduct = await ProductModel.findByIdAndUpdate(productid,{
                price:price
            },{new:true})
            
            res.status(200).send("The price is updated");
        }
        else if(stock!==0)
        {
            const updateproduct = await ProductModel.findByIdAndUpdate(productid,{
                stock:stock
            },{new:true})
            res.status(200).send("The stock is updated");
        }
    }else{
        res.status(400)
        throw new Error("There is no such a product")
    }
})

// used for admin to delete the product
// delete method
// private
const DeleteProduct = asyncHandler(async(req,res)=>{
    const productid = req.params.id;
    
    const DeletedProduct = await ProductModel.findByIdAndDelete(productid)

    if(DeletedProduct)
    {
        res.status(200).send("The product is deleted")
    }
    else
    {
        res.status(404)
        throw new Error("There is no such a product")
    }
})

module.exports = {CreateProduct,AllProduct,ProductById,UpdateProduct,DeleteProduct};