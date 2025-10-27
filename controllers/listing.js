const Listing = require("../model/list.js");




// index route
module.exports.index = async(req,res)=>{
    const allList = await Listing.find()
    res.render("listings/list.ejs",{allList});
};

// create route
module.exports.create = (req,res) =>{
    res.render("listings/create.ejs")
};

// post route

module.exports.post =async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"..",filename )
    let allList = new  Listing(req.body.listing);
    allList.owner =  req.user._id;
    allList.image = { url, filename }; 
    await allList.save();
    console.log(allList);
    req.flash("success","New Listing Add");
    res.redirect("/listings");
};


// edit route
module.exports.edit = async(req,res)=>{
    let {id}= req.params;
    const allList = await Listing.findById(id);
    res.render("listings/edit.ejs",{allList});
};


//update route
module.exports.update =async(req,res)=>{
   let  {id} = req.params;
   let allList = await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        allList.image = { url, filename }; 
        await allList.save();
   }
   
   req.flash("success"," Listing Edited");

   res.redirect(`/listings/${id}`);
};

// delete route
module.exports.delete = async(req,res)=>{
   let  {id} = req.params;
   let allList = await Listing.findByIdAndDelete(id);
   console.log(allList);
   req.flash("success"," Listing Deleted");
   res.redirect("/listings");
};

// show route
module.exports.show = async(req,res)=>{
    let{id} =req.params;
    const allList = await Listing.findById(id).populate({path: "reviews",
    populate:{
    path: "author",
    },
   })
    .populate("owner");
    if(!allList){
        req.flash("error"," Listing not found");
        return res.redirect("/listings");


    }
    console.log(allList);
    res.render("listings/show.ejs",{allList});
};