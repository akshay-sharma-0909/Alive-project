const Listing = require("./model/list");
const Review = require("./model/review");

const ExpressError = require("./utilis/ExpressError.js");
const { listingSchema } = require("./Joi.js");
const { reviewSchema} = require("./Joi.js");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        //redirect Url save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in ");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;

    }
    next();
}; 

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let allList = await Listing.findById(id);
       if(! allList.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this list ");
        return res.redirect(`/listings/${id}`);
    
       }
       next();

};

// validation schema //joi 
module.exports.validationListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(404,  error);
    }
    else{ 
        next();
    }
}


// Validtion for review

module.exports.ValidationReview =(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body) ;
    if(error){
        throw new ExpressError(404,error);
    }
    else{
        next();
    }
};

// is review author
module.exports.isAuthor = async(req, res, next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
       if(! review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author of this  ");
        return res.redirect(`/listings/${id}`);
    
       }
       next();

};
