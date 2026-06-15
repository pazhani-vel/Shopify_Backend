const asyncHandler = require('express-async-handler')
const CategoryModel = require('../Model/CategoryModel')

// for admin to create the new category
// post method
// private method
const CreateCategory = asyncHandler(async(req,res)=>{

    const name = req.body.name;
    const description = req.body.description;

    if(!name || !description)
    {
        res.status(400)
        throw new Error("All fields are required")
    }

    const NewCategory = await CategoryModel.create({
        name,description
    })

    console.log(NewCategory)

    if(NewCategory)
    {
        res.status(200).send("The new category is added")
    }
    else
    {
        res.status(400)
        throw new Error("The category is already exist")
    }

})

// for user to get all category
// get method
// private method
const GetAllCategory = asyncHandler(async(req,res)=>{

    const AllCategory = await CategoryModel.find().select("name")

    if(!AllCategory)
    {
        res.status(400)
        throw new Error("There is no category is available")
    }

    res.status(200).json(AllCategory)

})

// for user to get the category by id
// get method
// private method
const GetCatrogyById = asyncHandler(async(req,res)=>{
    const Category = await CategoryModel.findById(req.params.id)
    if(!Category)
    {
        res.status(400)
        throw new Error("There is no category is available")
    }

    res.status(200).json(Category)
})

// for admin to update the category
// put method
// private method
const UpdateCategory = asyncHandler(async(req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const categoryid = req.params.id;

    if(!name && !description)
    {
        res.status(400)
        throw new Error("All fields are required");
    }
    else if(name && description){
        const UpdatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryid,{
                name:name,description:description
            },{new:true}
        )

        res.status(200).send("The Category name and description is updated")
    }
    else if(name)
    {
         const UpdatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryid,{
                name:name
            },{new:true}
        )

        res.status(200).send("The Category name is updated")
    }else{
         const UpdatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryid,{
                description:description
            },{new:true}
        )

        res.status(200).send("The Category description is updated")
    }
})

// for admin to delete the category
// delete method
// private method
const DeleteCategory = asyncHandler(async(req,res)=>{
    const categoryid = req.params.id;

    const DeletedCategory = await CategoryModel.findByIdAndDelete(categoryid)

    if(DeleteCategory)
    {
        res.status(200).send("The is catogory is deleted")
    }
    else
    {
        res.status(400)
        throw new Error("The error in deleting the catogory")
    }
})


module.exports = {CreateCategory,GetAllCategory,GetCatrogyById,UpdateCategory,DeleteCategory};