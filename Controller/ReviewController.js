const asyncHandler = require('express-async-handler')
const ReviewModel = require('../Model/ReviewModel')
const ProductModel = require('../Model/ProductModel')

// used for create the review
// post method
// private
const CreateReview = asyncHandler(async(req,res)=>{
    const { productid, rating, comment } = req.body;

if(!productid || !rating || !comment)
{
    res.status(400);
    throw new Error("All fields are required");
}

const product = await ProductModel.findById(productid);

if(!product)
{
    res.status(404);
    throw new Error("Product not found");
}

const existingReview = await ReviewModel.findOne({
    user:req.user.id,
    product:productid
});

if(existingReview)
{
    res.status(400);
    throw new Error("You already reviewed this product");
}

const review = await ReviewModel.create({
    user:req.user.id,
    product:productid,
    rating,
    comment
});

const reviews = await ReviewModel.find({
    product:productid
});

product.totalReviews = reviews.length;

product.averageRating =
    reviews.reduce((sum,item)=>sum + item.rating,0)
    / reviews.length;

await product.save();

res.status(201).json(review);

})

// used for get the review
// get method
// private
const GetReview = asyncHandler(async(req,res)=>{
    const { productid } = req.params;

const reviews = await ReviewModel.find({
    product:productid
})
.populate("user","name");

res.status(200).json(reviews);

})

// used for update the review
// put method
const UpdateReview = asyncHandler(async(req,res)=>{
    const reviewId = req.params.id;
const { rating, comment } = req.body;

const review = await ReviewModel.findById(reviewId);

if(!review)
{
    res.status(404);
    throw new Error("Review not found");
}

if(review.user.toString() !== req.user.id)
{
    res.status(403);
    throw new Error("Unauthorized");
}

if(rating) review.rating = rating;
if(comment) review.comment = comment;

await review.save();

const product = await ProductModel.findById(
    review.product
);

const reviews = await ReviewModel.find({
    product:review.product
});

product.averageRating =
    reviews.reduce((sum,item)=>sum + item.rating,0)
    / reviews.length;

await product.save();

res.status(200).json(review);

})

// used for delete the review
// delete method
// private
const DeleteReview = asyncHandler(async(req,res)=>{
    const reviewId = req.params.id;

const review = await ReviewModel.findById(reviewId);

if(!review)
{
    res.status(404);
    throw new Error("Review not found");
}

if(review.user.toString() !== req.user.id)
{
    res.status(403);
    throw new Error("Unauthorized");
}

const productid = review.product;

await review.deleteOne();

const product = await ProductModel.findById(productid);

const reviews = await ReviewModel.find({
    product:productid
});

product.totalReviews = reviews.length;

product.averageRating =
    reviews.length === 0
    ? 0
    : reviews.reduce(
        (sum,item)=>sum + item.rating,
        0
    ) / reviews.length;

await product.save();

res.status(200).json({
    message:"Review deleted successfully"
});

})

module.exports = {CreateReview,GetReview,UpdateReview,DeleteReview}