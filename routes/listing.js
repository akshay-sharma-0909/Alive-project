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
router.get("/", asyncWrap(listingController.index));

//create Route
router.get("/create",isLoggedIn,listingController.create );


// post route
router.post("/",isLoggedIn, validationListing, upload.single("listings[image]"),  asyncWrap(listingController.post) );

// edit route
router.get("/:id/edit", isLoggedIn,isOwner, asyncWrap(listingController.edit));

//update route
router.put("/:id" , isLoggedIn, isOwner, validationListing, upload.single("listings[image]"), asyncWrap(listingController.update));

// delete route

router.delete("/:id",isLoggedIn,isOwner, asyncWrap(listingController.delete));

// show route

router.get("/:id",  asyncWrap(listingController.show));


module.exports = router ;