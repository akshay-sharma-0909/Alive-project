const Review = require("../model/review.js");
const Listing = require("../model/list.js");


// review 
module.exports.review = async(req, res) => {
    const { id  } = req.params;
    let allList = await Listing.findById(id);
    let newReview =  await new Review(req.body.review);
    // use to author information
    newReview.author = req.user._id ;
    console.log(newReview);

    allList.reviews.push(newReview);

    await newReview.save();
    await allList.save();

    console.log("review saved");
    req.flash("success","New Review Add");
    res.redirect(`/listing/${allList._id}`);
};

// review delete
module.exports.delete = async(req,res) => {
    let { id , reviewId } = req.params;
    await Listing.findByIdAndUpdate(id,{ $pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
     
    
    req.flash("success","Review Deleted");


    res.redirect(`/listing/${id}`);
};