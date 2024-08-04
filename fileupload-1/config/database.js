

const mongoose = require('mongoose');
require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("Db connection successfull"))
    .catch((error)=>{
        console.log(error);
        console.log("Connection unsuccessfull");
        process.exit(1);
    })
}