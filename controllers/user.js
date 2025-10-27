const User = require("../model/user.js");

// signupPage

module.exports.signupPage =  (req, res) => {
    res.render("signup.ejs");
};

// postSignUp

module.exports. postSignUp =  async (req, res) => {
    try{
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password); 
    console.log(registerUser);
    // login after signUp
    req.login(registerUser ,(error)=> {
        if(error)  {
            return next();
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    })
    
    }catch(error){
        req.flash("error",error.message);
        res.redirect("/signup");
    }
};

// login page

module.exports.loginPage = (req,res) =>{
    res.render("login.ejs");
}

//login post
module.exports.loginPost =  async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl ||"/listings";
    res.redirect( redirectUrl);
};

// logout
module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have logged out now!");
        res.redirect("/listings");
    }); 
};