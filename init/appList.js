const mongoose = require("mongoose");
const Listing = require("../model/list.js");
const initData = require("./data.js");

main()
    .then((res)=>{
        console.log("connected to DB ");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
} ;

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner: "68bf1286d79023d848dbdbc9"}));
    await Listing.insertMany(initData.data);
    console.log("data intizl");
  
};


initDB();