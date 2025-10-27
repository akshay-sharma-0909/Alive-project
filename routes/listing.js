const express = require("express");
const router = express.Router();
const asyncWrap = require("../utilis/wrapAsync.js");
const listingController  = require("../controllers/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const { validationListing } = require("../middleware.js");
const multer = require('multer');
const{storage} = require("../CloudConfig.js")
const upload = multer({ storage }); 




//index route
router.get("/listings", asyncWrap(listingController.index));

//create Route
router.get("/listings/create",isLoggedIn,listingController.create );


// post route
router.post("/listings",isLoggedIn, validationListing, upload.single("listing[image]"),  asyncWrap(listingController.post) );

// edit route
router.get("/listings/:id/edit", isLoggedIn,isOwner, asyncWrap(listingController.edit));

//update route
router.put("/listings/:id" , isLoggedIn, isOwner, validationListing, upload.single("listing[image]"), asyncWrap(listingController.update));

// delete route

router.delete("/listings/:id",isLoggedIn,isOwner, asyncWrap(listingController.delete));

// show route

router.get("/listings/:id",  asyncWrap(listingController.show));


module.exports = router ;