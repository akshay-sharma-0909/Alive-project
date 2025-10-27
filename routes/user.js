const express = require("express");
const router = express.Router();
const asyncWrap = require("../utilis/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController  = require("../controllers/user.js");



// signupPage
router.get("/signup",userController.signupPage);

// postSignUp
router.post("/signup", asyncWrap(userController.postSignUp));

// login page
router.get("/login",userController.loginPage);

//login post
router.post("/login", saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),userController.loginPost
);


// logout
router.get("/logout",userController.logout);




module.exports = router;
