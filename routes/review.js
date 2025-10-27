const express = require("express");
const router = express.Router();
const asyncWrap = require("../utilis/wrapAsync.js")
const ReviewController  = require("../controllers/review.js");
const { isLoggedIn } = require("../middleware.js");
const { ValidationReview } = require("../middleware.js");
const { isAuthor } = require("../middleware.js");



// review

router.post("/listing/:id/reviews",isLoggedIn, ValidationReview,ReviewController.review);

// delete reviws route

router.delete("/listing/:id/reviews/:reviewId",isLoggedIn,isAuthor,  asyncWrap(ReviewController.delete));

module.exports = router ;